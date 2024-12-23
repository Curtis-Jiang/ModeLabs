# 多模态大模型 API 使用文档

API 后端是基于 [FastChat](https://github.com/lm-sys/FastChat) 和 [vllm](https://github.com/vllm-project/vllm) 两个项目实现的，提供了 openai api 风格的接口，可以用于生成文本补全和聊天对话补全，详细信息可以参考 [FastChat OpenAI-Compatible RESTful APIs 文档](https://github.com/lm-sys/FastChat/blob/main/docs/openai_api.md) 和 [openai API reference 官方文档](https://platform.openai.com/docs/api-reference/chat)。若在使用过程中遇到任何无法解决的问题或发现后端存在异常，请联系助教。

## 创建聊天会话补全 (`POST /v1/chat/completions`)

此接口用于根据给定的提示文本和图像创建聊天式的会话补全。

#### 参数设置：

- `messages`: 提示文本和图像的列表，每个元素包含以下字段：
  - `role`: 消息的角色，可以是 `user` 、 `assistant` 或 `system`。
  - `content`: 消息的内容，可以是文本或图像的 URL。
- `max_tokens`: 生成的最大令牌数。
- `model`: 使用的模型名称，本文档中为 `llava-v1.6-34b`。


#### 示例代码：
在发送请求前，需要首先将图片转换为 base64 编码格式，可以使用 Pillow 库进行转换。
```python
import base64
import io

from PIL import Image

img_path = "path/to/image.jpg"
with Image.open(img_path) as img:
    buffered = io.BytesIO()

    img.save(buffered, format="PNG")
    img_data = buffered.getvalue()

    base64_encoded = base64.b64encode(img_data)
    img_base64 = f"data:image/png;base64,{base64_encoded.decode()}"
```

接着可以使用以下代码发送请求（目前**仅支持流式调用**）：

```python
from openai import OpenAI

base_url = "http://123.56.162.228:8008/api/v1"
api_key = "dummy_key"
model_name = "llava-v1.6-34b"
prompt = "Describe the image to me"

# 初始化客户端
client = OpenAI(base_url=base_url, api_key=api_key)

messages=[
    {
        "role": "user",
        "content": [
            {
                "type": "text",
                "text": prompt
            },
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
    stream=True,
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
```