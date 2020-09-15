module.exports = {
	function(client) {
		//			Selectors
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
		const socialLink = {
			facebook: 'a[title="Facebook"]',
			twitter: 'a[title="Twitter"]',
			instagram: 'a[title="Instagram"]',
			pinterest: 'a[title="Pinterest"]',
			facebookLabelLink: 'https://www.facebook.com/bestbuy',
			twitterLabelLink: 'https://twitter.com/BestBuy',
			instagramLabelLink: 'https://instagram.com/bestbuy',
			pinterestLabelLink: 'https://www.pinterest.com/bestbuy/',
		};
		var currentUrl = '';

		const timeout = 3 * 1000;
		const uploadTimeout = 5 * 1000;

		let cartItem = 0;
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
		// 0- even 1- odd
		let loaderoGroup = 0;
		let loopCount = 5;

		prepare();
		regionCheck();
		emailCheckClouse();
		//socialCheck();

		for (let i = 0; i < loopCount; i++) {
			addToCartItems(products);
			totalSum();
			screenshot(i);
			cartAllItemsClear();
			cartItem = 0;
			// return cartItem = 0;
		};

		function prepare() {
			client
				.maximizeWindow()
				.url(selectors.webSite)
				.waitForElementVisible('body', timeout)
				.waitForElementPresent(selectors.region, timeout)
				.pause(5 * 1000)
		};

		function regionCheck() {
			client
				.click(selectors.region)
		};

		function emailCheckClouse() {
			client
				.pause(1 * 3000)
				.click(selectors.emailCloseButton)
				.waitForElementVisible('body', timeout)
				.pause(timeout);
		};

		function socialCheck() {
			openLink(socialLink.facebook);
			changeActiveWindowTo_2();
			urlTest(socialLink.facebookLabelLink);
			closeWindow();

			openLink(socialLink.twitter);
			changeActiveWindowTo_2();
			urlTest(socialLink.twitterLabelLink);
			closeWindow();

			openLink(socialLink.instagram);
			changeActiveWindowTo_2();
			urlTest(socialLink.instagramLabelLink);
			closeWindow();

			openLink(socialLink.pinterest);
			changeActiveWindowTo_2();
			urlTest(socialLink.pinterestLabelLink);
			closeWindow();
		}

		function openLink(link) {
			client
				.pause(2 * 1000)
				.click(link)
				.pause(2 * 1000);
		};

		function closeWindow() {
			client
				.closeWindow()
				.pause(3 * 1000)
				.windowHandles(function (result) {
					var tab = result.value[0];
					client.switchWindow(tab);
				})
				.waitForElementVisible('body', timeout)
		};

		function changeActiveWindowTo_2() {
			client.windowHandles(function (result) {
				var tab = result.value[1];
				client.switchWindow(tab);
			});
		};

		function urlTest(labelLink) {
			client
				.url(function (result) {
					currentUrl = result;
					console.log(currentUrl);
					if (currentUrl.value === labelLink) {
						console.log(`CONGRATULATIONS ${labelLink} link is correctly !!!!!!!!!!!!!`);
					} else console.log(`${labelLink} link is not identical`)
				});
		};

		function addToCartItems() {
			if (loaderoGroup === 0) {
				for (let i = 2, productsInCart = 1; i < products.length; i += 3, cartItem++, productsInCart++) {
					client
						.click(selectors.searchArea)
						.setValue(selectors.searchArea, [products[i]])
						.click(selectors.searchButton)
						.pause(5 * 1000)
						.click(selectors.addToCartButton, () => {
							console.log(`Items in your cart[callback] = ${productsInCart}`)
						})
						.pause(6 * 1000)
						.click(selectors.cartFrameCloseBtn)
						.pause(5 * 1000)
						.click(selectors.searchClearButton)
						.pause(5 * 1000)
						.perform(() => {
							productsInCart = cartItem;
						});
				};
			} else if (loaderoGroup === 1) {
				for (let i = 1, productsInCart = 1; i < products.length; i += 2, cartItem++, productsInCart++) {
					client
						.click(selectors.searchArea)
						.setValue(selectors.searchArea, [products[i]])
						.click(selectors.searchButton)
						.waitForElementVisible('body', timeout)
						.click(selectors.addToCartButton)
						.pause(5 * 1000)
						.click(selectors.cartFrameCloseBtn)
						.pause(5 * 1000)
						.click(selectors.searchClearButton)
						.pause(timeout, () => {
							console.log(`Items in your cart[callback] = ${productsInCart}`)
						});
				};
			} else {
				console.log(`enter correct filter to variable LoaderoGroup : 0 = for even search, 1 = for odd search`)
			};
		};

		function screenshot(iterationCount) {
			client.saveScreenshot(`./assets/screenShot_${iterationCount}.png`);
		}

		function totalSum() {
			client
				.click(selectors.cart)
				.pause(uploadTimeout)
				.getText(selectors.priceForAllItems, function (result) {
					price = result.value;
					console.log(result)
				})
				.pause(timeout)
		};

		function cartAllItemsClear() {
			for (let i = 0, x = 0; i < cartItem; i++, x++) {
				client
					.pause(1 * 5000)
					.waitForElementVisible('body', timeout)
					.click(selectors.cartClearBtn, () => {
						x++;
						console.log(`${x} removed items from cart`)
					})
				//.waitForElementVisible('body', timeout)
			};
		};
	}
}
