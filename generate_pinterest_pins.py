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

def create_pinterest_pin(title, category, riddle_text, output_filename):
    # Standard Pinterest 2:3 Vertical Dimensions
    width, height = 1000, 1500
    
    # Background Image (Dark Slate Gradient Style)
    img = Image.new('RGB', (width, height), color='#0F172A')
    draw = ImageDraw.Draw(img)

    # Gradient Accents
    draw.ellipse([-200, -200, 600, 600], fill='#1E1B4B')
    draw.ellipse([500, 900, 1200, 1600], fill='#311B92')

    # Header Tag Badge
    badge_box = [80, 80, 520, 140]
    draw_rounded_rectangle(draw, badge_box, radius=25, fill='#6366F1')
    
    # Fonts (Fallback to default if custom font missing)
    try:
        font_title = ImageFont.truetype("arial.ttf", 52)
        font_badge = ImageFont.truetype("arialbd.ttf", 26)
        font_q = ImageFont.truetype("georgia.ttf", 42)
        font_cta = ImageFont.truetype("arialbd.ttf", 32)
        font_logo = ImageFont.truetype("arialbd.ttf", 36)
    except:
        font_title = font_badge = font_q = font_cta = font_logo = ImageFont.load_default()

    # Draw Badge Text
    draw.text((110, 98), f"🧠 {category.upper()} RIDDLES", fill='#FFFFFF', font=font_badge)

    # Draw Article Title
    draw.text((80, 190), title, fill='#F8FAFC', font=font_title)

    # Main Card Box
    card_box = [80, 360, 920, 1150]
    draw_rounded_rectangle(draw, card_box, radius=30, fill='#1E293B', outline='#6366F1', width=3)

    # Question Header Inside Card
    draw.text((120, 410), "CAN YOU SOLVE THIS?", fill='#EC4899', font=font_badge)
    
    # Wrap Question Text
    words = riddle_text.split()
    lines = []
    curr_line = ""
    for w in words:
        if len(curr_line + " " + w) < 26:
            curr_line += " " + w
        else:
            lines.append(curr_line.strip())
            curr_line = w
    if curr_line:
        lines.append(curr_line.strip())

    y_offset = 480
    for line in lines:
        draw.text((120, y_offset), f'"{line}"', fill='#F8FAFC', font=font_q)
        y_offset += 65

    # Answer CTA Box Inside Card
    cta_box = [120, 980, 880, 1080]
    draw_rounded_rectangle(draw, cta_box, radius=25, fill='#6366F1')
    draw.text((200, 1012), "👉 Click to Reveal Answer on Site!", fill='#FFFFFF', font=font_cta)

    # Footer Branding
    footer_box = [80, 1300, 920, 1420]
    draw_rounded_rectangle(draw, footer_box, radius=20, fill='#020617', outline='#334155', width=2)
    draw.text((240, 1345), "🧩 RiddlesAbout.com", fill='#F8FAFC', font=font_logo)

    # Save Image
    output_dir = r"C:\Users\HP\.gemini\antigravity\scratch\riddlesabout\pins"
    os.makedirs(output_dir, exist_ok=True)
    full_path = os.path.join(output_dir, output_filename)
    img.save(full_path, quality=95)
    print(f"Generated Pinterest Pin Image at: {full_path}")
    return full_path

if __name__ == "__main__":
    create_pinterest_pin(
        title="45+ Clever Riddles About Dogs\n(With Hints & Answers)",
        category="Animals",
        riddle_text="I have four legs, a wagging tail, and I bark when excited. What am I?",
        output_filename="dog_riddles_pinterest_pin.jpg"
    )
    create_pinterest_pin(
        title="100+ Best Springtime Riddles\nto Bloom Your Brain",
        category="Nature & Seasons",
        riddle_text="April showers bring May flowers, but what do May flowers bring?",
        output_filename="springtime_riddles_pinterest_pin.jpg"
    )
