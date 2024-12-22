from PIL import Image
import base64
from openai import OpenAI
import io

img_path = "black.jpeg"
base_url = "http://123.56.162.228:8008/api/v1"
api_key = "dummy_key"
model_name = "llava-v1.6-34b"
prompt = "Describe the image to me."

with Image.open(img_path) as img:
    buffered = io.BytesIO()

    img.save(buffered, format="PNG")
    img_data = buffered.getvalue()

    base64_encoded = base64.b64encode(img_data)
    img_base64 = f"data:image/png;base64,{base64_encoded.decode()}"

# 初始化客户端
client = OpenAI(base_url=base_url, api_key=api_key)

messages=[
    {
        "role": "user",
        "content": [
            {"type": "text", "text": prompt},
            {
                "type": "image_url",
                "image_url": {
                    "url": img_base64,
                },
            },
        ],
    }
]

response = client.chat.completions.create(
    model=model_name,
    messages=messages,
    max_tokens=1200,
    stream=True
)

# 获取生成的文本
collected_messages = "".join(
    chunk.choices[0].delta.content
    for chunk in response
    if chunk.choices[0].delta.content
)

splits = collected_messages.split("assistant", 1)
collected_messages = splits[1] if len(splits) > 1 else collected_messages

print(collected_messages)