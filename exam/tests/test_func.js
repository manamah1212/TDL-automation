// TODO: Run Prettier to format this file
// TODO: Use arrow functions where possible
// TODO: Use .waitForElementVisible()/.waitForElementPresent() instead of pause for faster execution
// TODO: I would recommend to use .forEach() loop over arrays instead of for loop for less verbose code
module.exports = {
	function(client) {
		//			Selectors
		const selectors = {
			// TODO: Classes and IDs can be addressed using shortened syntax instead of searching by argument - element.class and element#id respectively 
			webSite: 'https://www.bestbuy.com/',
			region: '[alt="United States"]',
			emailCloseButton: 'button[class="c-close-icon  c-modal-close-icon"]',
			searchButton: 'button[title="submit search"]',
			searchClearButton: 'button[id="header-clear-search-icon"]',
			searchArea: 'input[id="gh-search-input"]',
			//textSearchArea: 'input#gh-search-input.search-input[value=""]',
			addToCartButton: 'button[class="btn btn-primary btn-sm btn-block btn-leading-ficon add-to-cart-button"]:first-of-type',
			cartFrameCloseBtn: 'button[class="btn-default-link close-modal-x"]',
			cart: '[class="bby-cart lv"]',
			priceForAllItems: '[class="price-summary__total-value"]',
		};

		//			Social links in social icon 

		const socialLink = {
			// TODO: Create an array of objects for each social network that consists of 2 properties: selector and link.
			// This way you can easily iterate over it and simplify function which is commented on L62
			facebook: 'a[title="Facebook"]',
			twitter: 'a[title="Twitter"]',
			instagram: 'a[title="Instagram"]',
			pinterest: 'a[title="Pinterest"]',
			facebookLabelLink: 'https://www.facebook.com/bestbuy',
			twitterLabelLink: 'https://twitter.com/BestBuy',
			instagramLabelLink: 'https://instagram.com/bestbuy',
			pinterestLabelLink: 'https://www.pinterest.com/bestbuy/',
		};

		const timeout = 3 * 1000;
		const uploadTimeout = 5 * 1000;
		var currentUrl = '';
		let products = [
			//DONE      TODO: Remove these unnecessary number comments
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

		let LoaderoGroup = 0;


		//		TASK 1
		prepare();
		regionCheck();
		emailCheckClouse();
		//		TASK 2
		//DONE !!  TODO: These 5 repetative functions can be wrapped into another function which is run in a loop where you pass different params
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

		//		TASK 3
		//itemSearch(products); ------- implemented in function  addToCartItems()
		//console.log('NEXT even items')

		// 		TASK 3 - A
		//itemSearchEven(products);
		addToCartItems(products);
		totalSum();

		//				prepare
		function prepare() {
			client
				.maximizeWindow()
				.url(selectors.webSite)
				.waitForElementVisible('body', timeout)
				.waitForElementPresent(selectors.region, timeout);
		};

		//				region check
		function regionCheck() {
			client
				.click(selectors.region)
				.pause(timeout);
		};

		//				email check clouse

		function emailCheckClouse() {
			client
				.waitForElementVisible('body', timeout)
				.click(selectors.emailCloseButton)
				.pause(timeout);
		};
		//				open link
		function openLink(link) {
			client
				.click(link)
				.pause(timeout);
		};

		//close window
		function closeWindow() {
			client
				.closeWindow()
				.pause(timeout)
				.windowHandles(function (result) {
					var tab = result.value[0];
					client.switchWindow(tab);
				})
				.pause(timeout);
		};

		//						Change active tab
		function changeActiveWindowTo_2() {
			client.windowHandles(function (result) {
				var tab = result.value[1];
				client.switchWindow(tab);
			});
		};

		//		Save web site address to variable		&&		Link asserting 
		function urlTest(labelLink) {
			// TODO: Use .expect/.assert/.verify for this instead of if/else
			client
				.url(function (result) {
					currentUrl = result;
					console.log(currentUrl);
					if (currentUrl.value == labelLink) {
						console.log(`CONGRATULATIONS ${labelLink} link is correctly !!!!!!!!!!!!!`);
					} else console.log(`${labelLink} link is not identical`)

				});

		};

		//		Item search 
		function itemSearch(params) {

			for (let i = 0; i < products.length; i++) {
				client
					.click(selectors.textSearchArea)
					.setValue(selectors.textSearchArea, [products[i]])
					.click(selectors.searchButton)
					.pause(timeout)
					.click(selectors.searchClearButton)
					.pause(1 * 1000);
			};
		}

		// 				TASK -----3------A-------
		function itemSearchEven(params) {
			// TODO: Check L199 for improved code
			if (LoaderoGroup == 0) {
				for (let i = 0; i < products.length; i += 2) {
					client
						.click(selectors.searchArea)
						.setValue(selectors.searchArea, [products[i]])
						.click(selectors.searchButton)
						.pause(timeout)
						.click(selectors.searchClearButton)
						.pause(1 * 1000);
				};
			} else if (LoaderoGroup == 1) {
				for (let i = 0; i < products.length; i += 2) {
					client
						.click(selectors.searchArea)
						.setValue(selectors.searchArea, [products[i]])
						.click(selectors.searchButton)
						.pause(timeout)
						.click(selectors.searchClearButton)
						.pause(1 * 1000);
				};
			}
		}
		//			TASK	----3-4-5
		function addToCartItems(params) {
			// TODO: This if/else is really unnecessary. You can initialize let i = 0  before chechking LoaderoGroup parity.
			// If group ID is odd, change i value to 1, otherwise keep it as 0. Then you can run your loop and you won' t have
			// unnecessarily duplicated code (+ it will work if group id is 2 not only 0 or 1).
			if (LoaderoGroup == 0) {
				for (let i = 0, itemInCart = 1; i < products.length; i += 2, itemInCart++) {
					client
						.click(selectors.searchArea)
						.setValue(selectors.searchArea, [products[i]])
						.click(selectors.searchButton)
						.pause(4 * 1000)
						.click(selectors.addToCartButton, result => {
							//itemInCart += 1;
						})
						.pause(8 * 1000)
						.click(selectors.cartFrameCloseBtn)
						.pause(2 * 1000)
						.click(selectors.searchClearButton)
						.pause(timeout, () => {
							console.log(`Items in your cart[callback] = ${itemInCart}`)
						})
				}
			} else if (LoaderoGroup == 1) {
				for (let i = 1, itemInCart = 1; i < products.length; i += 2, itemInCart++) {
					client
						.click(selectors.searchArea)
						.setValue(selectors.searchArea, [products[i]])
						.click(selectors.searchButton)
						.pause(4 * 1000)
						.click(selectors.addToCartButton, result => {
							//itemInCart += 1;
						})
						.pause(8 * 1000)
						.click(selectors.cartFrameCloseBtn)
						.pause(2 * 1000)
						.click(selectors.searchClearButton)
						.pause(timeout, () => {
							console.log(`Items in your cart[callback] = ${itemInCart}`)
						})
				}
			} else {
				console.log(`enter correct filter to variable LoaderoGroup : 0 = for even search, 1 = for odd search`)
			}
		}
		//				TASK  5 price for all  
		function totalSum(params) {
			client
				.click(selectors.cart)
				.pause(uploadTimeout)
				.getText(selectors.priceForAllItems, function (result) {
					// TODO: Where is variable price declared and is it even used?
					price = result.value;
					console.log(result)
				})
				.pause(timeout);
		}


	}
}
