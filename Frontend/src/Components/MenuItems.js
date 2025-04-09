// MenuItems.js

import pohaImg from "../Assets/Pics/poha.png";
import upmaImg from "../Assets/Pics/upma.png";
import parathaImg from "../Assets/Pics/paratha.png";
import dhoklaImg from "../Assets/Pics/dhokla.png";
import aloopuriImg from "../Assets/Pics/aloopuri.png";
import idliImg from "../Assets/Pics/idli.png";
import masaladosaImg from "../Assets/Pics/masaladosa.png";
import paneersandwichImg from "../Assets/Pics/paneersandwich.png";
import vegcutletImg from "../Assets/Pics/vegcutlet.png";
import breadomeletteImg from "../Assets/Pics/breadomlette.png";

import samosaImg from "../Assets/Pics/samosa.png";
import kachoriImg from "../Assets/Pics/kachori.png";
import springrollImg from "../Assets/Pics/springroll.png";
import friesImg from "../Assets/Pics/frenchfries.png";
import vadapavImg from "../Assets/Pics/vadapav.png";
import pavbhajiImg from "../Assets/Pics/pavbhaji.png";
import bhelpuriImg from "../Assets/Pics/bhelpuri.png";
import sevpuriImg from "../Assets/Pics/shevpuri.png";
import cheeseballsImg from "../Assets/Pics/cheeseballs.png";
import pakoraImg from "../Assets/Pics/pakora.png";

import vegthaliImg from "../Assets/Pics/vegthali.png";
import paneerImg from "../Assets/Pics/paneer.png";
import daltadkaImg from "../Assets/Pics/daltadka.png";
import cholebhatureImg from "../Assets/Pics/cholebhature.png";
import jeerariceImg from "../Assets/Pics/jeerarice.png";
import rajmaImg from "../Assets/Pics/rajma.png";
import aloomatarImg from "../Assets/Pics/aloomatar.png";
import mixvegImg from "../Assets/Pics/mixveg.png";
import bhindifryImg from "../Assets/Pics/bhindifry.png";
import chapatiImg from "../Assets/Pics/chapati.png";

import lassiImg from "../Assets/Pics/lassi.png";
import coldcoffeeImg from "../Assets/Pics/coldcoffee.png";
import chaiImg from "../Assets/Pics/chai.png";
import nimbupaniImg from "../Assets/Pics/nimbupani.png";
import milkshakeImg from "../Assets/Pics/milkshake.png";

import gulabjamunImg from "../Assets/Pics/gulabjamun.png";
import rasgullaImg from "../Assets/Pics/rasgulla.png";
import kheerImg from "../Assets/Pics/kheer.png";
import halwaImg from "../Assets/Pics/halwa.png";
import icecreamImg from "../Assets/Pics/icecream.png";

import saladImg from "../Assets/Pics/salad.png";
import papadImg from "../Assets/Pics/papad.png";
import raitaImg from "../Assets/Pics/raita.png";
import pickleImg from "../Assets/Pics/pickle.png";
import butternaanImg from "../Assets/Pics/butternaan.png";
import tandoorirotiImg from "../Assets/Pics/tandooriroti.png";
import curdImg from "../Assets/Pics/curd.png";
import sweetcornImg from "../Assets/Pics/sweetcorn.png";
import paneerrollImg from "../Assets/Pics/paneerroll.png";
import cakeImg from "../Assets/Pics/cake.png";


const MenuItems = [
  // Breakfast
  { id: 1, name: "Poha", category: "Breakfast", price: 57, image: pohaImg },
  { id: 2, name: "Upma", category: "Breakfast", price: 105, image: upmaImg },
  { id: 3, name: "Paratha", category: "Breakfast", price: 35, image: parathaImg },
  { id: 4, name: "Dhokla", category: "Breakfast", price: 117, image: dhoklaImg },
  { id: 5, name: "Aloo Puri", category: "Breakfast", price: 145, image: aloopuriImg },
  { id: 6, name: "Idli Sambhar", category: "Breakfast", price: 80, image: idliImg },
  { id: 7, name: "Masala Dosa", category: "Breakfast", price: 90, image: masaladosaImg },
  { id: 8, name: "Paneer Sandwich", category: "Breakfast", price: 60, image: paneersandwichImg },
  { id: 9, name: "Veg Cutlet", category: "Breakfast", price: 45, image: vegcutletImg },
  { id: 10, name: "Bread Omelette", category: "Breakfast", price: 50, image: breadomeletteImg },

  // Snacks
  { id: 11, name: "Samosa", category: "Snacks", price: 20, image: samosaImg },
  { id: 12, name: "Kachori", category: "Snacks", price: 25, image: kachoriImg },
  { id: 13, name: "Spring Roll", category: "Snacks", price: 35, image: springrollImg },
  { id: 14, name: "French Fries", category: "Snacks", price: 55, image: friesImg },
  { id: 15, name: "Vada Pav", category: "Snacks", price: 15, image: vadapavImg },
  { id: 16, name: "Pav Bhaji", category: "Snacks", price: 70, image: pavbhajiImg },
  { id: 17, name: "Bhel Puri", category: "Snacks", price: 30, image: bhelpuriImg },
  { id: 18, name: "Sev Puri", category: "Snacks", price: 35, image: sevpuriImg },
  { id: 19, name: "Cheese Balls", category: "Snacks", price: 65, image: cheeseballsImg },
  { id: 20, name: "Pakora", category: "Snacks", price: 40, image: pakoraImg },

  // Lunch
  { id: 21, name: "Veg Thali", category: "Lunch", price: 150, image: vegthaliImg },
  { id: 22, name: "Paneer Butter Masala", category: "Lunch", price: 130, image: paneerImg },
  { id: 23, name: "Dal Tadka", category: "Lunch", price: 90, image: daltadkaImg },
  { id: 24, name: "Chole Bhature", category: "Lunch", price: 100, image: cholebhatureImg },
  { id: 25, name: "Jeera Rice", category: "Lunch", price: 60, image: jeerariceImg },
  { id: 26, name: "Rajma Chawal", category: "Lunch", price: 110, image: rajmaImg },
  { id: 27, name: "Aloo Matar", category: "Lunch", price: 75, image: aloomatarImg },
  { id: 28, name: "Mix Veg", category: "Lunch", price: 95, image: mixvegImg },
  { id: 29, name: "Bhindi Fry", category: "Lunch", price: 85, image: bhindifryImg },
  { id: 30, name: "Chapati", category: "Lunch", price: 10, image: chapatiImg },

  // Beverages
  { id: 31, name: "Lassi", category: "Beverages", price: 35, image: lassiImg },
  { id: 32, name: "Cold Coffee", category: "Beverages", price: 50, image: coldcoffeeImg },
  { id: 33, name: "Masala Chai", category: "Beverages", price: 20, image: chaiImg },
  { id: 34, name: "Nimbu Pani", category: "Beverages", price: 25, image: nimbupaniImg },
  { id: 35, name: "Milkshake", category: "Beverages", price: 60, image: milkshakeImg },

  // Desserts
  { id: 36, name: "Gulab Jamun", category: "Desserts", price: 30, image: gulabjamunImg },
  { id: 37, name: "Rasgulla", category: "Desserts", price: 35, image: rasgullaImg },
  { id: 38, name: "Kheer", category: "Desserts", price: 40, image: kheerImg },
  { id: 39, name: "Halwa", category: "Desserts", price: 35, image: halwaImg },
  { id: 40, name: "Ice Cream", category: "Desserts", price: 50, image: icecreamImg },

  // Extras
  { id: 41, name: "Green Salad", category: "Extras", price: 25, image: saladImg },
  { id: 42, name: "Papad", category: "Extras", price: 10, image: papadImg },
  { id: 43, name: "Raita", category: "Extras", price: 30, image: raitaImg },
  { id: 44, name: "Pickle", category: "Extras", price: 5, image: pickleImg },
  { id: 45, name: "Butter Naan", category: "Extras", price: 25, image: butternaanImg },
  { id: 46, name: "Tandoori Roti", category: "Extras", price: 15, image: tandoorirotiImg },
  { id: 47, name: "Curd", category: "Extras", price: 20, image: curdImg },
  { id: 48, name: "Sweet Corn", category: "Extras", price: 40, image: sweetcornImg },
  { id: 49, name: "Paneer Roll", category: "Extras", price: 60, image: paneerrollImg },
  { id: 50, name: "Chocolate Cake", category: "Desserts", price: 70, image: cakeImg },
];

export default MenuItems;
