import axios from "axios";

class TestMobile {
  constructor() {
    this.id = "";
    this.uniqueSuffix = `${Date.now()}`;
  }

  insertFakeEntry = async () => {
    try {
      this.id = "";

      const response = await axios.post("http://localhost:4000/api/create", {
        brand: 'Test Brand',
        modelNumber: `iPhone 13 Pro - ${this.uniqueSuffix}`,
        price: 1199.99,
        color: 'Graphite123',
        specifications: {
            display: '6.1 inches Super Retina XDR',
            camera: 'Triple 12 MP, 12 MP, 12 MP',
            processor: 'A15 Bionic',
            storage: '256 GB',
        },
        releaseDate: new Date('2022-09-14'),
        batteryCapacity: '3095 mAh',
        connectivity: {
            wifi: true,
            bluetooth: true,
            cellular: true,
        },
        weight: 189,
        operatingSystem: 'iOS 15',
        isWaterResistant: true,
        additionalFeatures: ['Face ID', 'MagSafe Technology'],
        accessories: [
            { name: 'MagSafe Charger', type: 'Charging', price: 39.99 },
            { name: 'Leather Case', type: 'Case', price: 69.99 },
            { name: 'AirPods Pro', type: 'Earbuds', price: 249.99 },
        ],
        warranty: {
            validUntil: new Date('2023-09-14'),
            type: 'AppleCare+',
        },
        image: 'https://www.apple.com/newsroom/images/product/iphone/standard/Apple_iPhone-13-Pro_Colors_09142021_big.jpg.slideshow-xlarge_2x.jpg',
      });

      this.id = response.data.data._id;
    } catch (error) {
      console.log("error inserting fake user entry!", error);
    }
  };

  deleteFakeEntry = async () => {
    try {
      await axios.delete(`http://localhost:4000/api/mobiles/${this.id}`);
      this.id = "";
    } catch (error) {
      console.log("error deleting fake user entry!", error);
    }
  };

  getId = () => {
    return this.id;
  };

  getTitle = () => {
    return `Test Brand`;
  };
}

export default TestMobile;