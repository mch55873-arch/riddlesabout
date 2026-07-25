import os
from PIL import Image, ImageDraw, ImageFont

def draw_rounded_rectangle(draw, xy, radius, fill, outline=None, width=1):
    x1, y1, x2, y2 = xy
    draw.rectangle([x1 + radius, y1, x2 - radius, y2], fill=fill)
    draw.rectangle([x1, y1 + radius, x2, y2 - radius], fill=fill)
    draw.pieslice([x1, y1, x1 + 2*radius, y1 + 2*radius], 180, 270, fill=fill)
    draw.pieslice([x2 - 2*radius, y1, x2, y1 + 2*radius], 270, 360, fill=fill)
    draw.pieslice([x1, y2 - 2*radius, x1 + 2*radius, y2], 90, 180, fill=fill)
    draw.pieslice([x2 - 2*radius, y2 - 2*radius, x2, y2], 0, 90, fill=fill)
    if outline:
        draw.arc([x1, y1, x1 + 2*radius, y1 + 2*radius], 180, 270, fill=outline, width=width)
        draw.arc([x2 - 2*radius, y1, x2, y1 + 2*radius], 270, 360, fill=outline, width=width)
        draw.arc([x1, y2 - 2*radius, x1 + 2*radius, y2], 90, 180, fill=outline, width=width)
        draw.arc([x2 - 2*radius, y2 - 2*radius, x2, y2], 0, 90, fill=outline, width=width)

def create_riddle_infographic_chart():
    width, height = 1000, 1500
    
    # Soft Warm Beige Background (CoffeeAbout Style)
    img = Image.new('RGB', (width, height), color='#FDFBF7')
    draw = ImageDraw.Draw(img)

    # Fonts
    try:
        font_main_title = ImageFont.truetype("arialbd.ttf", 46)
        font_sub_title = ImageFont.truetype("georgia.ttf", 24)
        font_row_title = ImageFont.truetype("arialbd.ttf", 28)
        font_body = ImageFont.truetype("arial.ttf", 20)
        font_badge = ImageFont.truetype("arialbd.ttf", 18)
        font_logo = ImageFont.truetype("arialbd.ttf", 30)
    except:
        font_main_title = font_sub_title = font_row_title = font_body = font_badge = font_logo = ImageFont.load_default()

    # Main Title Header
    draw.text((220, 50), "Dog Breed Riddles Chart", fill='#1E293B', font=font_main_title)
    draw.text((280, 110), "Quick Difficulty & Clue Guide for Riddle Lovers", fill='#64748B', font=font_sub_title)

    # Divider Line
    draw.line([(60, 150), (940, 150)], fill='#E2E8F0', width=3)

    # 5 Infographic Rows (Breed, Clue, Difficulty, Answer)
    rows_data = [
        {"breed": "Golden Retriever", "clue": "Golden coat, loves swimming & waterfowl fetch", "diff": "EASY", "badge_bg": "#10B981", "icon": "🦮"},
        {"breed": "German Shepherd", "clue": "Police hound, black & tan coat, highly loyal", "diff": "MEDIUM", "badge_bg": "#F59E0B", "icon": "🐕"},
        {"breed": "Siberian Husky", "clue": "Arctic sled puller, thick double fur & blue eyes", "diff": "MEDIUM", "badge_bg": "#F59E0B", "icon": "🐺"},
        {"breed": "Poodle", "clue": "Curly hypoallergenic coat, French origin, 3 sizes", "diff": "HARD", "badge_bg": "#EF4444", "icon": "🐩"},
        {"breed": "Dachshund", "clue": "Sausage-shaped long body, short legs, hunts badgers", "diff": "MEDIUM", "badge_bg": "#F59E0B", "icon": "🌭"}
    ]

    y_pos = 180
    for item in rows_data:
        # Card container
        card_rect = [60, y_pos, 940, y_pos + 210]
        draw_rounded_rectangle(draw, card_rect, radius=20, fill='#FFFFFF', outline='#E2E8F0', width=2)

        # Left Icon Box
        icon_box = [80, y_pos + 20, 240, y_pos + 190]
        draw_rounded_rectangle(draw, icon_box, radius=16, fill='#F1F5F9')
        draw.text((135, y_pos + 70), item["icon"], fill='#0F172A', font=font_main_title)

        # Breed Title & Details
        draw.text((270, y_pos + 30), item["breed"], fill='#0F172A', font=font_row_title)
        draw.text((270, y_pos + 75), f"Primary Clue: {item['clue']}", fill='#475569', font=font_body)
        draw.text((270, y_pos + 120), f"Semantic Class: Canine Breed • Category: Animals", fill='#94A3B8', font=font_body)

        # Difficulty Badge Right Top
        badge_rect = [780, y_pos + 30, 910, y_pos + 75]
        draw_rounded_rectangle(draw, badge_rect, radius=15, fill=item["badge_bg"])
        draw.text((805, y_pos + 42), item["diff"], fill='#FFFFFF', font=font_badge)

        y_pos += 230

    # Bottom Branding Banner (CoffeeAbout Footer Style)
    banner_rect = [0, 1420, 1000, 1500]
    draw.rectangle(banner_rect, fill='#6366F1')
    draw.text((320, 1445), "🧩 RiddlesAbout.com", fill='#FFFFFF', font=font_logo)

    # Save Output File
    output_path = r"C:\Users\HP\.gemini\antigravity\scratch\riddlesabout\pins\Dog_Breed_Riddles_Infographic_Chart.jpg"
    img.save(output_path, quality=95)

    desktop_path = os.path.expanduser('~/Desktop/Dog_Breed_Riddles_Infographic_Chart.jpg')
    img.save(desktop_path, quality=95)
    print(f"Infographic Chart successfully created at: {desktop_path}")

if __name__ == "__main__":
    create_riddle_infographic_chart()
