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

# 1. Purple Two-Column Table Printable Card (Sample 1 Style)
def generate_purple_table_pin():
    width, height = 1000, 1500
    img = Image.new('RGB', (width, height), color='#FFFFFF')
    draw = ImageDraw.Draw(img)

    try:
        font_title = ImageFont.truetype("arialbd.ttf", 44)
        font_h2 = ImageFont.truetype("arialbd.ttf", 32)
        font_body = ImageFont.truetype("arial.ttf", 22)
        font_ans = ImageFont.truetype("arialbd.ttf", 22)
        font_logo = ImageFont.truetype("arialbd.ttf", 26)
    except:
        font_title = font_h2 = font_body = font_ans = font_logo = ImageFont.load_default()

    # Purple Header
    draw.rectangle([0, 0, 1000, 160], fill='#D8B4FE')
    draw.text((180, 35), '"What Am I?" Riddles', fill='#0F172A', font=font_title)
    draw.text((340, 95), 'With Answers', fill='#0F172A', font=font_title)

    # Table Header Box
    draw.rectangle([50, 190, 680, 250], fill='#E9D5FF', outline='#000000', width=2)
    draw.rectangle([680, 190, 950, 250], fill='#E9D5FF', outline='#000000', width=2)
    draw.text((320, 205), "Riddle", fill='#000000', font=font_h2)
    draw.text((750, 205), "Answer", fill='#000000', font=font_h2)

    # Table Content Rows
    riddles = [
        ("I am seen but never touched. What am I?", "A shadow"),
        ("I am always open but never closed. What am I?", "The sky"),
        ("I have hands but no arms. What am I?", "A clock"),
        ("I can be kept but never seen. What am I?", "A secret"),
        ("I am taken before you get me. What am I?", "A photo"),
        ("I have a bed but never sleep. What am I?", "A river"),
        ("I have many branches but no leaves. What am I?", "A bank"),
        ("I travel the world while staying in one place. What am I?", "A stamp"),
        ("I have a heart that doesn't beat. What am I?", "An artichoke"),
        ("I have a ring but no finger. What am I?", "A phone")
    ]

    y_pos = 250
    for q, a in riddles:
        draw.rectangle([50, y_pos, 680, y_pos + 110], outline='#000000', width=1)
        draw.rectangle([680, y_pos, 950, y_pos + 110], outline='#000000', width=1)
        draw.text((70, y_pos + 40), q, fill='#000000', font=font_body)
        draw.text((710, y_pos + 40), a, fill='#000000', font=font_ans)
        y_pos += 110

    # Footer
    draw.rectangle([0, 1420, 1000, 1500], fill='#D8B4FE')
    draw.text((340, 1445), "🧩 RiddlesAbout.com", fill='#0F172A', font=font_logo)

    desktop = os.path.expanduser('~/Desktop/Printable_Table_Pin_Sample1.jpg')
    img.save(desktop, quality=95)
    print("Purple Table Pin saved at:", desktop)

# 2. Senior Printable Worksheet with Answer Bank (Sample 4 Style)
def generate_worksheet_matching_pin():
    width, height = 1000, 1500
    img = Image.new('RGB', (width, height), color='#FFFFFF')
    draw = ImageDraw.Draw(img)

    try:
        font_title = ImageFont.truetype("arialbd.ttf", 52)
        font_item = ImageFont.truetype("arial.ttf", 22)
        font_bank = ImageFont.truetype("arialbd.ttf", 20)
        font_logo = ImageFont.truetype("arialbd.ttf", 26)
    except:
        font_title = font_item = font_bank = font_logo = ImageFont.load_default()

    # Header Title
    draw.text((220, 40), "SENIOR RIDDLES", fill='#000000', font=font_title)
    draw.line([(50, 110), (950, 110)], fill='#000000', width=3)

    # 15 Numbered Blanks
    questions = [
        "1. The more I dry, the wetter I become.",
        "2. I have arms and legs but no head. What am I?",
        "3. I have a head and a tail but no body. What am I?",
        "4. I don't ask questions but am always answered. What am I?",
        "5. I smash scissors and paper covers me. What am I?",
        "6. What has to be broken before you can use it?",
        "7. I can fall off a building and survive, but in water I die.",
        "8. I am always running but have no legs. What am I?",
        "9. I get smaller every time I take a bath. What am I?",
        "10. I have a neck but no head. What am I?",
        "11. The more you take, the more you leave behind.",
        "12. I am easy to lift but hard to throw.",
        "13. I am full of holes but still hold water.",
        "14. I am tall when I'm young and short when I'm old.",
        "15. I can be cracked, made, told or played."
    ]

    y_pos = 135
    for q in questions:
        draw.text((70, y_pos), "________  " + q, fill='#000000', font=font_item)
        y_pos += 72

    # Answer Bank Box at Bottom
    bank_rect = [50, 1220, 950, 1400]
    draw_rounded_rectangle(draw, bank_rect, radius=15, fill='#FFFFFF', outline='#000000', width=2)

    bank_items = [
        "A. A coin       D. An armchair   G. A Fridge     J. A candle     M. A towel",
        "B. A bottle     E. A feather     H. A rock       K. A joke       N. Paper",
        "C. An egg       F. Soap          I. Footsteps    L. A telephone  O. A sponge"
    ]
    by = 1240
    for line in bank_items:
        draw.text((75, by), line, fill='#000000', font=font_bank)
        by += 50

    # Footer Banner
    draw.rectangle([0, 1430, 1000, 1500], fill='#000000')
    draw.text((340, 1450), "www.riddlesabout.com", fill='#FFFFFF', font=font_logo)

    desktop = os.path.expanduser('~/Desktop/Printable_Worksheet_Pin_Sample4.jpg')
    img.save(desktop, quality=95)
    print("Worksheet Matching Pin saved at:", desktop)

if __name__ == "__main__":
    generate_purple_table_pin()
    generate_worksheet_matching_pin()
