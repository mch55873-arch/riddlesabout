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

# Sample 1: Step-by-Step Speech Bubble Style Infographic
def generate_step_infographic():
    width, height = 1000, 1500
    img = Image.new('RGB', (width, height), color='#F59E0B') # Vibrant Amber Yellow
    draw = ImageDraw.Draw(img)

    try:
        font_title = ImageFont.truetype("arialbd.ttf", 44)
        font_num = ImageFont.truetype("arialbd.ttf", 48)
        font_text = ImageFont.truetype("arialbd.ttf", 22)
        font_logo = ImageFont.truetype("arialbd.ttf", 28)
    except:
        font_title = font_num = font_text = font_logo = ImageFont.load_default()

    # Title
    draw.text((120, 60), "How to Solve Any Tricky Riddle", fill='#78350F', font=font_title)
    draw.text((360, 120), "In 6 Easy Steps", fill='#B45309', font=font_text)

    steps = [
        ("1", "Read the Question Carefully"),
        ("2", "Spot Keywords & Double Meanings"),
        ("3", "Look for Wordplay & Puns"),
        ("4", "Think Out of the Box"),
        ("5", "Eliminate Impossible Scenarios"),
        ("6", "Reveal the Answer & Smile!")
    ]

    y_positions = [200, 390, 580, 770, 960, 1150]
    is_left = True
    for idx, (num, text) in enumerate(steps):
        y = y_positions[idx]
        if is_left:
            # Number on left
            draw.text((100, y + 25), num, fill='#78350F', font=font_num)
            bubble_box = [180, y, 900, y + 130]
            draw_rounded_rectangle(draw, bubble_box, radius=30, fill='#FEF3C7')
            draw.text((220, y + 45), text, fill='#78350F', font=font_text)
        else:
            # Number on right
            bubble_box = [100, y, 820, y + 130]
            draw_rounded_rectangle(draw, bubble_box, radius=30, fill='#FEF3C7')
            draw.text((140, y + 45), text, fill='#78350F', font=font_text)
            draw.text((850, y + 25), num, fill='#78350F', font=font_num)

        is_left = not is_left

    # Footer
    draw.rectangle([0, 1420, 1000, 1500], fill='#78350F')
    draw.text((340, 1445), "🧩 RiddlesAbout.com", fill='#FFFFFF', font=font_logo)

    desktop = os.path.expanduser('~/Desktop/How_To_Solve_Riddles_Infographic.jpg')
    img.save(desktop, quality=95)
    print("Step Infographic saved at:", desktop)

# Sample 2: Grouped Category Style Infographic
def generate_grouped_infographic():
    width, height = 1000, 1500
    img = Image.new('RGB', (width, height), color='#FFFBEB') # Cream Light
    draw = ImageDraw.Draw(img)

    try:
        font_title = ImageFont.truetype("arialbd.ttf", 46)
        font_header = ImageFont.truetype("arialbd.ttf", 26)
        font_item = ImageFont.truetype("arialbd.ttf", 20)
        font_logo = ImageFont.truetype("arialbd.ttf", 28)
    except:
        font_title = font_header = font_item = font_logo = ImageFont.load_default()

    # Title Banner
    draw.rectangle([0, 0, 1000, 140], fill='#7F1D1D')
    draw.text((160, 45), "Riddles About Nature & Seasons", fill='#FFFFFF', font=font_title)

    groups = [
        ("SPRINGTIME RIDDLES", "#991B1B", ["🌸 Blooming Flowers", "🌧️ April Rain Showers", "🐝 Honeybees & Pollen"]),
        ("SUMMER RIDDLES", "#9A3412", ["☀️ Golden Sunshine", "🏖️ Sandy Beaches", "🍦 Cold Ice Cream"]),
        ("AUTUMN RIDDLES", "#854D0E", ["🍁 Falling Leaves", "🎃 Halloween Pumpkins", "🌬️ Cool Harvest Wind"]),
        ("WINTER RIDDLES", "#1E3A8A", ["❄️ Falling Snowflakes", "☃️ Frosty Snowmen", "🔥 Cozy Fireplaces"])
    ]

    y_pos = 180
    for header, color, items in groups:
        # Category Banner
        draw.rectangle([60, y_pos, 940, y_pos + 50], fill=color)
        draw.text((330, y_pos + 10), header, fill='#FFFFFF', font=font_header)

        # Items Grid Box
        box = [60, y_pos + 50, 940, y_pos + 260]
        draw_rounded_rectangle(draw, box, radius=15, fill='#FFFFFF', outline='#E2E8F0', width=2)

        item_x = 100
        for item in items:
            item_box = [item_x, y_pos + 85, item_x + 240, y_pos + 225]
            draw_rounded_rectangle(draw, item_box, radius=12, fill='#F8FAFC', outline='#CBD5E1')
            draw.text((item_x + 15, y_pos + 140), item, fill='#0F172A', font=font_item)
            item_x += 270

        y_pos += 300

    # Footer
    draw.rectangle([0, 1420, 1000, 1500], fill='#7F1D1D')
    draw.text((340, 1445), "🧩 RiddlesAbout.com", fill='#FFFFFF', font=font_logo)

    desktop = os.path.expanduser('~/Desktop/Nature_Riddles_Category_Infographic.jpg')
    img.save(desktop, quality=95)
    print("Grouped Infographic saved at:", desktop)

if __name__ == "__main__":
    generate_step_infographic()
    generate_grouped_infographic()
