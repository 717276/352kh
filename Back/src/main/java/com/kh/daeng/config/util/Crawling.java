package com.kh.daeng.config.util;

import java.time.Duration;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.NoSuchElementException;
import org.openqa.selenium.TimeoutException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.springframework.stereotype.Component;

import com.kh.daeng.domain.dto.tour.Crawl;
import com.kh.daeng.domain.dto.tour.Hotel;
@Component
public class Crawling {
	public static WebDriver driver;
	private static final String uploadPath = "D:/upload/image";
	private static final String url = "https://www.agoda.com/ko-kr/";

	public List<Crawl> process(String loc, String strDate, String endDate, int room, int pcnt, int ccnt) throws TimeoutException{		
		System.setProperty("webdriver.chrome.driver", "C:\\chromedriver-win32\\chromedriver.exe");
		ChromeOptions options = new ChromeOptions();
		options.addArguments("--disable-popup-blocking"); 
//		options.addArguments("headless");
		options.addArguments("--disable-gpu");
		options.addArguments("--blink-settings=imagesEnabled=false");
		driver = new ChromeDriver(options);

		try {
			return getDataList(loc, strDate, endDate, room, pcnt, ccnt);
		} catch (InterruptedException e) {
			e.printStackTrace();
		} catch (TimeoutException e) {
			System.err.println("in process catch timeout exception");
			throw e;
		}
		System.out.println("crawling process return null");
		return null;
	}

	private List<Crawl> getDataList(String loc, String str, String end, int room, int adult, int child) 
			throws InterruptedException,TimeoutException {
		List<Crawl> list = new ArrayList<>();
		List<String> temp_name = new ArrayList<>();
		List<String> temp_img = new ArrayList<>();
		
		WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
		JavascriptExecutor js = null;
		driver.get(url);

		wait = new WebDriverWait(driver, Duration.ofSeconds(10));

		// region
		WebElement selected = driver.findElement(By.xpath("//*[@id=\"textInput\"]"));
		selected.sendKeys(loc);

		wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("ul.AutocompleteList")));
		WebElement firstSuggestion = driver
				.findElement(By.cssSelector("ul.AutocompleteList > li.Suggestion.Suggestion__categoryName"));
		System.out.println("location " + firstSuggestion.getAttribute("data-text"));
		firstSuggestion.click();

		// date
		selected = wait.until(
				ExpectedConditions.visibilityOfElementLocated(By.xpath("//span[@data-selenium-date='" + str + "']")));
		selected.click();

		selected = wait.until(
				ExpectedConditions.visibilityOfElementLocated(By.xpath("//span[@data-selenium-date='" + end + "']")));
		selected.click();

		for (int i = 1; i < room; ++i) {
			selected = wait.until(ExpectedConditions.visibilityOfElementLocated(
					By.xpath("//*[@id=\"FocusTrap\"]/div/div/div[1]/div[2]/div[2]/div/button")));
			selected.click();
		}

		if (adult > 2) {
			for (int i = 2; i < adult; ++i) {
				selected = wait.until(ExpectedConditions.visibilityOfElementLocated(
						By.xpath("//*[@id=\"FocusTrap\"]/div/div[1]/div[2]/div[2]/button[2]")));
				selected.click();
			}
		} else {
			selected = wait.until(ExpectedConditions
					.visibilityOfElementLocated(By.xpath("//*[@id=\"FocusTrap\"]/div/div[1]/div[2]/div[2]/button[1]")));
			selected.click();
		}

		if (child != 0) {
			for (int i = 0; i < child; ++i) {
				selected = wait.until(ExpectedConditions.visibilityOfElementLocated(
						By.xpath("//*[@id=\"FocusTrap\"]/div/div/div[3]/div[2]/button[2]")));
				selected.click();
			}
		}
		if (child != 0) {
			selected = wait.until(ExpectedConditions
					.visibilityOfElementLocated(By.xpath("//*[@id=\"occupancy-box\"]/div/div/div/div[1]")));
			selected.click();
		}
		// search
		wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//*[@id='Tabs-Container']/button")));
		selected = driver.findElement(By.xpath("//*[@id='Tabs-Container']/button"));
		if (selected.isDisplayed()) {
			System.out.println("display " + selected.getText());
		}
		js = (JavascriptExecutor) driver;
		js.executeScript("arguments[0].click();", selected);

		wait = new WebDriverWait(driver, Duration.ofSeconds(10));

        String originalWindowHandle = driver.getWindowHandle();        
        boolean isNewWindowOpened = false;
        for (int i = 0; i < 10; i++) {
            Set<String> windowHandles = driver.getWindowHandles();
            if (windowHandles.size() > 1) {
                isNewWindowOpened = true;
                break;
            }
            Thread.sleep(500);
        }
        if (isNewWindowOpened) {
            System.out.println("Switching to new window");
            Set<String> windowHandles = driver.getWindowHandles();
            for (String handle : windowHandles) {
                if (!handle.equals(originalWindowHandle)) {
                    driver.switchTo().window(handle);
                    break;
                }
            }          
        } 

        // scroll
        WebElement option = driver.findElement(By.xpath("//*[@id=\"SideBarLocationFilters\"]/div[7]/div[2]/ul/li[12]/span/span[2]/span/span[1]"));
        js.executeScript("arguments[0].scrollIntoView(true);", option);
        option.click();
        
        System.out.println("get hotel name");               
		wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("[data-selenium=hotel-name]")));
        List<WebElement> hotel_name_elements = wait.until(ExpectedConditions.visibilityOfAllElementsLocatedBy(By.cssSelector("[data-selenium='hotel-name']")));

		for (WebElement hotel_name : hotel_name_elements) {
			temp_name.add(hotel_name.getText());			
		}

		System.out.println("get hotel image");
		wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("[data-element-name=ssrweb-mainphoto]")));
		wait = new WebDriverWait(driver, Duration.ofSeconds(10));
		List<WebElement> mainphoto_elements = driver.findElements(By.cssSelector("[data-element-name=ssrweb-mainphoto]"));
		System.out.println("Number of images found: " + mainphoto_elements.size());

		for (WebElement element : mainphoto_elements) {
		    WebElement imgElement = null;
		    try {
		        imgElement = element.findElement(By.tagName("img"));
		    } catch (NoSuchElementException e) {
		        System.err.println("imgElement is null");
		    }
		    
		    String imgUrl = null;
		    if (imgElement == null) {
		        imgUrl = element.getAttribute("src");
		    } else {
		        imgUrl = imgElement.getAttribute("src");

		    }		    	   
		    if (imgUrl != null && !imgUrl.isEmpty()) {
		        temp_img.add(imgUrl);
		    } else {
		        System.out.println("URL is null or empty for element: " + element);
		    }
		}

		System.out.println("get hotel-price");
		wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("[data-element-name=final-price]")));
		List<WebElement> price_elements = driver.findElements(By.cssSelector("[data-element-name=final-price]"));
		
		for (int i = 0; i < price_elements.size(); ++i) {
			WebElement price = price_elements.get(i);
			Crawl h = new Crawl();
			h.setName(temp_name.get(i));						
			h.setPhoto(temp_img.get(i));
			h.setPrice(price.getText());
			list.add(h);
		}		
		return list;
	}	
}
