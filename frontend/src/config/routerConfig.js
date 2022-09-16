export const routerConfig = {
	HOME: {
		name: "Home",
		url: "/",
	},
	SHOP: {
		name: "Shop",
		url: "/shop",
	},
	AUTH: {
		name: "Login / Register",
		url: "/auth",
	},
	USER_PROFILE: {
		name: "Your profile",
		url: '/userProfile'
	},
	USER_ACTIVE: {
		url: '/user-activate/:id'
	},
	MY_ADS: {
		name: "My ads",
		url: "/my-ads"
	},
	MY_ADS_EDIT: {
		url: "/my-ads/edit-product/:id",
		realUrl: (id) => `/my-ads/edit-product/${id}`
	},
	SHOP_AD: {
		url: "/shop/ad/:id",
		realUrl: (id) => `/shop/ad/${id}`
	}
};
