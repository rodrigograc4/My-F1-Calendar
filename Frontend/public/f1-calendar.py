import requests
from ics import Calendar
from datetime import datetime, timezone
import os

# URL do calendário original
url = "https://better-f1-calendar.vercel.app/api/calendar.ics"
response = requests.get(url)
response.raise_for_status()
calendar = Calendar(response.text)

# Diretório onde este script está (Frontend/public)
output_dir = os.path.dirname(__file__)

# Header personalizado para os .ics
ICS_HEADER = """BEGIN:VCALENDAR
VERSION:2.0
PRODID:My F1 Calendar
NAME:F1
X-WR-CALNAME:F1
"""

# Lista de configurações para gerar os ficheiros
configs = [
    {"emojis": True,  "practice": True,  "qualifying": True,  "filename": "myf1calendar-emoji-pract-quali-races.ics"},
    {"emojis": False, "practice": True,  "qualifying": True,  "filename": "myf1calendar-pract-quali-races.ics"},
    {"emojis": True,  "practice": False, "qualifying": True,  "filename": "myf1calendar-emoji-quali-races.ics"},
    {"emojis": False, "practice": False, "qualifying": True,  "filename": "myf1calendar-quali-races.ics"},
    {"emojis": True,  "practice": False, "qualifying": False, "filename": "myf1calendar-emoji-races.ics"},
    {"emojis": False, "practice": False, "qualifying": False, "filename": "myf1calendar-races.ics"},
]

# Emojis para cada tipo de evento
emoji_map = {
    "Practice": "🏎️ ",
    "Qualifying": "⏱️ ",
    "Race": "🏁 ",
}

# Função para gerar calendário filtrado
def generate_calendar(emojis, practice, qualifying):
    new_cal = Calendar()
    now = datetime.now(timezone.utc)
    
    for event in calendar.events:
        if event.begin < now:
            continue

        include_event = False
        if practice and "Practice" in event.name:
            include_event = True
        if qualifying and "Qualifying" in event.name:
            include_event = True
        if "Race" in event.name:
            include_event = True

        if include_event:
            new_event = event.clone()
            if emojis:
                if "Practice" in new_event.name:
                    new_event.name = emoji_map["Practice"] + new_event.name
                elif "Qualifying" in new_event.name:
                    new_event.name = emoji_map["Qualifying"] + new_event.name
                elif "Race" in new_event.name:
                    new_event.name = emoji_map["Race"] + new_event.name
            new_event.description = None
            new_cal.events.add(new_event)
    return new_cal

# Loop para gerar todos os ficheiros
for cfg in configs:
    cal = generate_calendar(cfg["emojis"], cfg["practice"], cfg["qualifying"])
    ics_text = cal.serialize()

    # Remove qualquer header padrão e substitui pelo personalizado
    vevent_index = ics_text.find("BEGIN:VEVENT")
    if vevent_index != -1:
        ics_body = ics_text[vevent_index:]
    else:
        ics_body = ""

    lines = [line.strip() for line in ics_body.splitlines() if line.strip()]
    ics_crlf = ICS_HEADER + "\r\n".join(lines) + "\r\nEND:VCALENDAR\r\n"

    filepath = os.path.join(output_dir, cfg["filename"])
    with open(filepath, "w", encoding="utf-8", newline="") as f:
        f.write(ics_crlf)

print("✅ Todos os calendários F1 foram criados com sucesso!")
