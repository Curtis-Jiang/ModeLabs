# pip install selenium
# webdriver下载至driver文件夹下
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
import time

def test_in_chrome(driver_path):
    """
    打开 Google Chrome 浏览器并访问 localhost:3000。
    
    :param driver_path: Chrome WebDriver 路径
    """
    # 设置 Chrome 浏览器选项
    options = Options()
    options.add_argument("--start-maximized")  # 启动全屏模式

    # 创建 Chrome 浏览器服务对象
    service = Service(executable_path=driver_path)

    # 启动 Chrome 浏览器
    driver = webdriver.Chrome(service=service, options=options)
    time.sleep(2)
    try:
        # 打开 localhost:3000
        driver.get("http://localhost:3000")

        # 等待页面加载（可以根据需要调整等待时间）
        time.sleep(1)

        # 这里可以添加更多的测试代码，比如查找元素、验证页面内容等

        print("Page opened successfully.")
                # 查找并点击注册按钮
        sign_in_button = driver.find_element(By.CSS_SELECTOR, "a.px-6.py-3.bg-gradient-to-r.from-purple-600.to-blue-500.text-white.rounded-full")
        sign_in_button.click()

        # 等待页面跳转
        time.sleep(1)
                # 查找邮箱输入框并输入邮箱
        email_input = driver.find_element(By.CSS_SELECTOR, "input[type='email']")
        email_input.send_keys("liu-mq22@mails.tsinghua.edu.cn")

        # 查找密码输入框并输入密码
        password_input = driver.find_element(By.CSS_SELECTOR, "input[type='password']")
        password_input.send_keys("cxk666")

        # 查找登录按钮并点击
        login_button = driver.find_element(By.CSS_SELECTOR, "button[type='submit']")
        login_button.click()

        # 等待登录操作完成
        time.sleep(4)

        # 这里可以添加更多的测试代码，比如验证登录是否成功
        print("Login test completed successfully.")

        # 查找并点击返回主页按钮
        home_button = driver.find_element(By.CSS_SELECTOR, "#root > div > div > div.mb-6.flex.justify-between.items-center > button.flex.items-center.space-x-2.px-4.py-2.bg-white.rounded-lg.shadow.hover\:bg-gray-50.transition-colors")


        home_button.click()
        time.sleep(2)

        start_button = driver.find_element(By.CSS_SELECTOR, "#root > div > main > div > main > div > div > button")
        start_button.click()
        time.sleep(2)
        multi_button = driver.find_element(By.CSS_SELECTOR, "#root > div > main > div > div.relative.z-10.py-28.px-6.lg\:px-32 > div.max-w-7xl.mx-auto > div.flex.justify-center.space-x-4.mb-10 > button.px-6.py-3.rounded-xl.text-lg.font-medium.transition-all.duration-300.bg-white.text-gray-600.hover\:bg-gray-50.border.border-gray-200")
        multi_button.click()
        time.sleep(2)
        large_button = driver.find_element(By.CSS_SELECTOR, "#root > div > main > div > div.relative.z-10.py-28.px-6.lg\:px-32 > div.max-w-7xl.mx-auto > div.flex.justify-center.space-x-4.mb-10 > button.px-6.py-3.rounded-xl.text-lg.font-medium.transition-all.duration-300.bg-gradient-to-r.from-violet-600.to-blue-500.text-white.shadow-lg.transform.scale-105")
        large_button.click()
        time.sleep(2)

        home_button = driver.find_element(By.CSS_SELECTOR, "#root > div > nav > div.flex.items-center.space-x-4 > a")
        home_button.click()

        # 等待页面跳转
        time.sleep(2)

        recommedn_button = driver.find_element(By.CSS_SELECTOR, "#root > div > nav > div.hidden.lg\:flex.items-center.space-x-6 > button:nth-child(4)")
        recommedn_button.click()
        time.sleep(3)

        english_button = driver.find_element(By.CSS_SELECTOR, "#root > div > div.container.mx-auto.px-4.py-12.relative > div.max-w-4xl.mx-auto > div.grid.grid-cols-1.md\:grid-cols-2.gap-6.mb-12 > div.group.cursor-pointer.transition-all.duration-300.rounded-2xl.bg-white.border.border-teal-100.hover\:bg-teal-50\/50.hover\:shadow-lg.hover\:shadow-gray-100\/50.border > div")
        english_button.click()
        time.sleep(3)
    finally:
        # 关闭浏览器
        driver.quit()

def main():
    # 设置 Chrome 驱动路径
    chrome_driver_path = r'.//driver//chromedriver.exe'  # 修改为你的 WebDriver 路径
    
    # 调用测试函数
    test_in_chrome(chrome_driver_path)

if __name__ == "__main__":
    main()