module.exports = {
	function(client) {
		const selectors = {
			webSite: 'https://www.bestbuy.com/',
			region: '[alt="United States"]',
			emailCloseButton: 'button[class="c-close-icon  c-modal-close-icon"]',
			searchButton: 'button[title="submit search"]',
			searchClearButton: 'button[id="header-clear-search-icon"]',
			searchArea: 'input[id="gh-search-input"]',
			addToCartButton: 'i[class="ficon-cart"]',
			cartFrameCloseBtn: 'button[class="btn-default-link continue-shopping"]',
			cart: '[class="bby-cart lv"]',
			priceForAllItems: '[class="price-summary__total-value"]',
			cartClearBtn: 'a[class="btn-default-link link-styled-button cart-item__remove"]',
		};

		let products = [
			'Apple - AirPods with Charging Case (Latest Model) - White',
			'apple watch series 5 (gps) 44mm space gray aluminum case with black sport band - space gra',
			'samsung - 65" class - 7 series - 4k uhd tv - smart - led - with hdr',
			'a7 iii',
			'Amazon - Echo Show (2nd Gen)',
			'macbook air',
			'macbook pro - 16"',
			'Samsung - 65" Class - 7 Series - 4K UHD TV',
			'HP - Pavilion x360 2-in-1 14" Touch-Screen Laptop',
		];
		const socialResources = [{
			selector: 'a[title="Facebook"]',
			url: 'https://www.facebook.com/bestbuy'
		},
		{
			selector: 'a[title="Twitter"]',
			url: 'https://twitter.com/BestBuy'
		},
		{
			selector: 'a[title="Instagram"]',
			url: 'https://instagram.com/bestbuy'
		},
		{
			selector: 'a[title="Pinterest"]',
			url: 'https://www.pinterest.com/bestbuy/'
		},
		];

		const timeout = 3 * 1000;
		let cartItem = 0;
		let loaderoGroup = 0;
		let loopCount = 5;
		let originalHandle;
		let initialHandles;

		prepare();
		checkLinks();

		for (let i = 0; i < loopCount; i++) {
			addToCartItems(products);
			totalSum();
			screenshot(i);
			cartAllItemsClear();
			cartItem = 0;
		};

		//------
		function prepare() {
			client
				.maximizeWindow()
				.url(selectors.webSite)
				.windowHandles(({ value }) => (initialHandles = value))
				.windowHandle(({ value }) => (originalHandle = value))
				.waitForElementVisible('[alt="United States"]', 5 * 1000)
				.click('[alt="United States"]')
				
				.waitForElementVisible('body', 5 * 1000)
				.click('button[class="c-close-icon  c-modal-close-icon"]')
				.waitForElementVisible('body', 5 * 1000)
				.pause(2 * 1000);
		}

		function checkLinks() {
			client.perform(() => {
				socialResources.forEach(({ selector, url }) => checkLink(selector, url));
			});
		}

		function checkLink(linkSelector, urlString) {
			client
				.waitForElementVisible(linkSelector, timeout)
				.click(linkSelector)
				.windowHandles(({ value }) => {
					const handles = value;

					handles.forEach(handle => {
						if (!initialHandles.includes(handle)) {
							client.switchWindow(handle);
						}
					});
				})
				.waitForElementVisible('body', 5 * 1000)
				.verify.urlEquals(urlString)
				.closeWindow()
				.perform(() => client.switchWindow(originalHandle))
				.pause(2 * 1000);
		}

		function addToCartItems() {
			let i = loaderoGroup % 2 === 0 ? 0 : 1;//if loaderoGroup % 2 = 0 => 0 \\ if loaderoGroup %2 != = => 1

			for (productsInCart = 1; i < products.length; i += 2, cartItem++, productsInCart++) {
				client
					.click(selectors.searchArea)
					.setValue(selectors.searchArea, [products[i]])
					.click(selectors.searchButton)
					.pause(2 * 1000)
					.waitForElementVisible(selectors.addToCartButton, timeout)
					.click(selectors.addToCartButton, () => {
						console.log(`Items in your cart[callback] = ${productsInCart}`)
					})
					.waitForElementVisible(selectors.cartFrameCloseBtn, false)
					.pause(1 * 1000)
					.click(selectors.cartFrameCloseBtn)
					.waitForElementVisible(selectors.searchClearButton)
					.click(selectors.searchClearButton)
					.perform(() => {
						productsInCart = cartItem;
					});
			};
		};

		function screenshot(iterationCount) {
			client.saveScreenshot(`./assets/screenShot_${iterationCount}.png`);
		}

		function totalSum() {
			client
				.click(selectors.cart)
				.waitForElementVisible('body', timeout)
				.getText(selectors.priceForAllItems, function (result) {
					price = result.value;
					console.log(result)
				})
				.pause(timeout)
		};

		function cartAllItemsClear() {
			for (let i = 0, x = 0; i < cartItem; i++, x++) {
				client
					.pause(1 * 1000)
					.waitForElementVisible('body', timeout)
					.click(selectors.cartClearBtn, () => {
						x++;
						console.log(`${x} removed items from cart`)
					})
			};
		};
	}
}
