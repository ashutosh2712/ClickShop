import Iphone from "../assets/iphone.jpg";
import SonyHeadphone from "../assets/sonyoverfinished.webp";
import cameraImage from "../assets/DSLRCamera.jpg";
import mouseImage from "../assets/mouse.jpeg";
import MoniterImage from "../assets/samsungMonitor.avif";
import KeyboardImage from "../assets/gamig_keybaord.jpeg";

const products = [
  {
    _id: "1",
    name: "iPhone 15 Pro",
    image: Iphone,
    description:
      "The Apple iPhone 15 redefines smartphone innovation with its cutting-edge features and design. Sporting a powerful 48MP Main Camera with 2X Telephoto capability, it elevates photography to new heights, capturing stunning details and providing optical-quality zoom. The device introduces the Dynamic Island, a feature that bubbles up alerts and live activities, ensuring users stay informed without interruption. Its innovative design includes a durable colour-infused glass and aluminium build.",
    brand: "Apple",
    category: "Electronics",
    price: 779.56,
    countInStock: 10,
    rating: 4.5,
    numReviews: 12,
  },
  {
    _id: "2",
    name: "SONY Headphone[WH-1000XM5]",
    image: SonyHeadphone,
    description:
      "Over-ear headphones like the WH-CH720N provide listeners with an insulated listening experience, blocking out most ambient noise. The headphone cups cover the entire ear, making over-ear headphones great for listening in public. These headphones can deliver 35 hours of use on a full charge. Equipped with two microphones in each earcup with Dual Noise Sensor technology, similar to the WH-1000XM5, the WH-CH720N captures ambient noises and blocks them out. The microphones also have Precise Voice Pickup and new Wind Noise Reduction technology for voice clarity on phone calls.",
    brand: "Sony",
    category: "Electronics",
    price: 149.99,
    countInStock: 7,
    rating: 4.0,
    numReviews: 8,
  },
  {
    _id: "3",
    name: "Nikon D5300 DSLR Camera",
    image: cameraImage,
    description:
      "24.2MP DX-Format CMOS Sensor EXPEED 4 Image Processor No Optical Low-Pass Filter 3.2″ 1,037k-Dot Vari-Angle LCD Monitor Full HD 1080p Video Recording at 60 fps Multi-CAM 4800DX 39-Point AF Sensor Native ISO 12800, Extended to ISO 25600 5 fps Shooting at Full Resolution Built-In Wi-Fi and GPS Connectivity NIKKOR 18-140mm f/3.5-5.6G ED VR Lens",
    brand: "Nikon",
    category: "Electronics",
    price: 731.23,
    countInStock: 5,
    rating: 3,
    numReviews: 12,
  },
  {
    _id: "4",
    name: "APEX PRO Mini Wireless Keyboard",
    image: KeyboardImage,
    description:
      "INFINITELY CUSTOMIZABLE, UNTETHERED SPEED with OmniPoint 2.0 Adjustable HyperMagnetic switches WORLD’S FASTEST KEYBOARD — 20x faster actuation, 11x faster response than traditional mechanical keyboards RAPID TRIGGER — Eradicate latency arising from the physical movement of the switch through dynamic activation and deactivation of keys based on travel distance rather than a fixed point in the key travel.",
    brand: "Apex",
    category: "Electronics",
    price: 279.99,
    countInStock: 0,
    rating: 5,
    numReviews: 12,
  },
  {
    _id: "5",
    name: "Odyssey Neo G9",
    image: MoniterImage,
    description:
      "The all-new Samsung Odyssey Neo G9 builds upon the success of the original Odyssey G9, and it features the world's first dual UHD resolution (7680 x 2160) display with a 32:9 aspect ratio. The monitor has a mammoth 1000R curved 57-inch panel that uses quantum mini LED technology with VESA Display HDR 1000 certification for excellent image reproduction in even the most challenging in-game environments.",
    brand: "Odyssey",
    category: "Electronics",
    price: 2500.0,
    countInStock: 7,
    rating: 3.5,
    numReviews: 10,
  },
  {
    _id: "6",
    name: "T-Wolf V6 Gaming Design RGB Mouse",
    image: mouseImage,
    description:
      "E-sports gaming mechanical mouse, born specifically for gaming: support macro definition programming, 3200DPI, electroplating double wings",
    brand: "Amazon",
    category: "Electronics",
    price: 10.0,
    countInStock: 0,
    rating: 4,
    numReviews: 12,
  },
];

export default products;
