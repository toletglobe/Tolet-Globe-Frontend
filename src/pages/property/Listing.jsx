import { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaSearch } from "react-icons/fa";

import "./listing.css";
import hamburger from "../../assets/property/hamburger.png";
import drop from "../../assets/property/drop.png";
import loc from "../../assets/property/location.png";
import SelectLocation from "./listingComponents/SelectLocation";
import Filters from "./listingComponents/Filters";
import Cards from "./listingComponents/Cards";
import Pagination from "./listingComponents/Pagination";
import { ClipLoader } from "react-spinners";
import { useStateValue } from "../../StateProvider";
import { BASE_URL } from "../../constant/constant";
import axios from "axios";

const Listing = () => {
  const { city } = useParams();
  const navigate = useNavigate();

  const [Hamburger, SetHamburger] = useState(false);
  const [isOpen, SetIsOpen] = useState(false);
  const [totalPages, setTotalPages] = useState();
  const [properties, setProperties] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState(false);
  const [showCity, setShowCity] = useState(false);
  const [showArea, setShowArea] = useState(false);
  const [Location, setLocation] = useState(false);
  const location = useLocation();
  const propertiesPerPage = 9;
  const [showSelectCity, setShowSelectCity] = useState(false);
  // let selectedCity = false;
  const [favouriteList, setFavouriteList] = useState([]);
  const [{ compareProperty }, dispatch] = useStateValue();

  const [filterCount, setFilterCount] = useState(0);

  const authState = useSelector((state) => state.auth);
  const [noPropertiesFound, setNoPropertiesFound] = useState(false);
  const [selectedLocality, setSelectedLocality] = useState("");
  const [selectedArea, setSelectedArea] = useState([]);
  const [moreArea, setMoreArea] = useState(false);
  // const [selectedCity, setSelectedCity] = useState("");

  // Extract query string from the URL
  const queryString = location.search;

  // Decode the query string
  const params = new URLSearchParams(queryString);
  const residential = params.get("residential"); // Example: Get the value of 'param1'
  const commercial = params.get("commercial"); // Example: Get the value of 'param1'

  // console.log("Got the type", residential, commercial);

  const [filters, setFilters] = useState({
    bhk: [],
    residential: [],
    commercial: [],
    preferenceHousing: "",
    genderPreference: "",
    houseType: [],
  });

  // To be Updated
  const citylocalities = {
    // Respected Localities of Particular City
    Lucknow: [
      "Gomti Nagar",
      "Aliganj",
      "Indira Nagar",
      "Chinhat",
      "Hazratganj",
      "Aashiana",
      "Aminabad",
      "Surender Nagar",
      "Chowk",
      "Jankipuram",
      "Rajajipuram ",
      "Mahanagar ",
    ],
    Ayodhya: ["ayodhya1", "ayodhya2"],
    Vellore: ["vellore1", "vellore2"],
    Kota: ["kota1", "kota2"],
  };

  const areas = [
    "Aadarsh Nagar",
    "Aashiana",
    "Aashiyana",
    "Aastha Nagar",
    "Abhay Khand",
    "Abhishek Puram",
    "Abhshekpuram",
    "Achalikhera",
    "Adarsh Colony",
    "Adarsh Nagar",
    "Adarsh Vihar Colony",
    "Adhar Khera",
    "Adil Nagar",
    "Aditi Pujan",
    "Agra",
    "Ahibaranpur",
    "Ahimamau",
    "Ahiran Khera",
    "Ahiyapur",
    "Ahmamau",
    "Ahok Vihar Colony",
    "Aishbagh",
    "Ajadnagar",
    "Ajay Nagar",
    "Ajgain",
    "Ajith Ganj Colony",
    "Akash Enclave",
    "Akbar Nagar",
    "Akbari Gate",
    "Akhilesh Yadav Road Area",
    "Alam Bagh",
    "Alam Nagar",
    "Alambagh",
    "Alamgir",
    "Alamnagar",
    "Alamnagar.",
    "Alampur",
    "Alia Colony",
    "Aliganj",
    "Aliganj Sector N",
    "Aligarh",
    "Alinagar Sonhara",
    "Alinar Khurd",
    "Allu Nagar Diguria",
    "Allu Nagar Diguruia",
    "Almas Bagh",
    "Almasbagh",
    "Aluwa",
    "Alwar",
    "Aman Vihar",
    "Amar Shaheed Path",
    "Amausi",
    "Amausi Airport Locality",
    "Ambedkar Nagar",
    "Amber Ganj",
    "Ameer Nagar",
    "Amethi",
    "Amina Hamza Bazaar",
    "Aminabad",
    "Amraigaon",
    "Amrapali Market",
    "Amrudhi Bagh",
    "Anamika Enclave",
    "Anand Nagar",
    "Andhpur",
    "Anora",
    "Ansal Shaheed Path",
    "Araipur",
    "Arand",
    "Aravali Marg",
    "Arjun Ganj",
    "Arjun Nagar",
    "Arjun Vihar",
    "Arjunganj",
    "Arthik Azadi",
    "Arya Nagar",
    "Asharfabad",
    "Asharfabad Extension",
    "Ashiana",
    "Ashiyana",
    "Ashiyana Colony",
    "Ashiyana Vistar",
    "Ashok Vihar",
    "Ashraf Nagar",
    "Ashraf Vihar Colony",
    "Ashutosh Nagar",
    "Aslam Nagar",
    "Asutosh Nagar",
    "Ataria",
    "Atifvihar",
    "Atrauli",
    "Atwat",
    "Aurangabad Khalsa",
    "Autrouli",
    "Avadh Shilpgram",
    "Avadh Vihar Colony",
    "Avadh Vihar Yojna Phase 2",
    "Avas Vikas Colony",
    "Awadh Bus Station",
    "Awadh Vihar Yojna",
    "Awadhpuri Khand",
    "Awho Colony",
    "Ayodhya",
    "Azad Guest House",
    "Azad Nagar",
    "Azadpur",
    "Aziz Nagar",
    "B Block",
    "B-Block",
    "Baba Haider Ali Colony",
    "Babu Ganj",
    "Babu Purva Colony",
    "Babuganj",
    "Babupurwa",
    "Bachhrawan",
    "Bada Bharwara",
    "Bada Chauraha",
    "Bada Gaon",
    "Badan Khera",
    "Badhamau",
    "Badi Bakri",
    "Badi Jugoli",
    "Badruk",
    "Badsha Ji Bagh",
    "Badshah Nagar",
    "Badshahnagar",
    "Bagiamau",
    "Bahadur Shah Colony",
    "Bahadurpur",
    "Bahar B",
    "Baheriya",
    "Bajrang Colony",
    "Bajrang Vihar Colony",
    "Bajrangbali Nagar",
    "Bakhtiyar Nagar",
    "Bakkas",
    "Baksaria",
    "Bakshi Ka Talab",
    "Bal Singh Khera",
    "Bal Vihar Extension",
    "Balaganj",
    "Balakganj",
    "Balalganj",
    "Balapur",
    "Balda Colony",
    "Balrampur",
    "Balrampur Garden",
    "Banarsi Tola",
    "Bandariya Bag Railway Colony",
    "Bandariya Bagh",
    "Bandariya Bagh Railway Colony",
    "Bangaon",
    "Bangla Bazar",
    "Banpurwa",
    "Bans Mandi",
    "Bansmandi",
    "Banthra",
    "Bara Bharwara",
    "Bara Chandganj",
    "Barabirwa",
    "Baragaon",
    "Baraula",
    "Barauli Khalilabad",
    "Barauna",
    "Baraura Hussain Bari",
    "Barawan Kalan",
    "Barde Bagha",
    "Barethi",
    "Barha",
    "Barhauli",
    "Barhni Chafa",
    "Bari Lal Kurti Bazar",
    "Bari Lalkurti Bazzar",
    "Bariya Pur",
    "Baroliya",
    "Baruwa",
    "Bas Mandi",
    "Basaha",
    "Basant Kunj",
    "Basant Vihar Colony",
    "Basantpur",
    "Basrehya",
    "Bbd University Area",
    "Begaumabad",
    "Behri Mandi",
    "Behsa",
    "Behta",
    "Behtajabi",
    "Behtwa",
    "Belagavi",
    "Belava",
    "Belwa",
    "Beni Ganj",
    "Bhaavya Kapur",
    "Bhadoi",
    "Bhadruk",
    "Bhagwant Nagar",
    "Bhagwantnagar",
    "Bhaisora",
    "Bhamraulli Shah Pur",
    "Bhankur",
    "Bharat Nagar",
    "Bharavara",
    "Bharawamau",
    "Bharawan",
    "Bharwara",
    "Bhat Purwa",
    "Bhatia Tower",
    "Bhatkheri",
    "Bhatpur",
    "Bhavyapuram",
    "Bheem Nagar",
    "Bhera Mandi",
    "Bheri Mandi",
    "Bhitargaon",
    "Bhitauli",
    "Bhitauli Crossing",
    "Bhitauli Khurd",
    "Bhitoli Khurd",
    "Bhogipura",
    "Bhola Khera",
    "Bhomu Khera",
    "Bhoohar",
    "Bhujasa",
    "Bhusa Mandi",
    "Bibiapur",
    "Bibipur",
    "Bichhiya",
    "Bichhiya Railway Colony",
    "Bighapur",
    "Bijnaur",
    "Bijnor",
    "Bijnour",
    "Bilahari",
    "Birahu",
    "Birua",
    "Bkt (Bakshi Ka Talab)",
    "Bliss Colony",
    "Block A",
    "Block B",
    "Block C",
    "Block F",
    "Block I",
    "Blunt Square",
    "Borumau",
    "Braham Nagar",
    "Brahampuri Colony",
    "Brahmapuri Colony",
    "Buddha Colony",
    "Budheshwar Colony",
    "Buniyad Bagh",
    "Buniyadbagh",
    "Butler Colony",
    "Canal Colony",
    "Cantonment",
    "Cantonment Area",
    "Cash And Pay Colony",
    "Cganga Vihar",
    "Chaata Meel",
    "Chachenda",
    "Chak Bibipur",
    "Chak Kajehra",
    "Chak Kashirpuri",
    "Chak Kjehra.",
    "Chakdadanpur",
    "Chakeri Ward",
    "Chakganjagiri",
    "Chakmirpur",
    "Chakoli",
    "Chamraoli",
    "Chand Ganj",
    "Chand Saray",
    "Chanda Coder",
    "Chander Nagar",
    "Chandganj",
    "Chandganj Garden",
    "Chandiyamau",
    "Chandoli",
    "Chandpur",
    "Chandpur Industrial Area",
    "Chandpur Khanipur",
    "Chandra Lok",
    "Chandralok Colony",
    "Chandraval",
    "Chandrawal",
    "Chandresh",
    "Charan Bagh",
    "Charbagh",
    "Charkop",
    "Chaupatiyan",
    "Chauri",
    "Chhata Meel",
    "Chhatha Meel",
    "Chhota Bhoolakheri",
    "Chhoti Lal Kurti",
    "Chikamberpur",
    "Chillawan",
    "Chiloki",
    "Chinat",
    "Chinhat",
    "Chinnat",
    "Chota Chandganj",
    "Chota Imambara",
    "Chowk",
    "Churamanpur",
    "Civil Lines",
    "Community Center Khand 3",
    "Csir Colony",
    "D - Block",
    "D Block",
    "D-Block",
    "D2 Block",
    "Dabauli",
    "Dahiya",
    "Dahiyar",
    "Dalibagh",
    "Dalibagh Colony",
    "Daliganj",
    "Dandiya Bazar",
    "Dasdoi",
    "Dashauli",
    "Daud Nagar",
    "Daulatganj",
    "Daulatpur",
    "Daulatpur Grant",
    "Dayal Bagh",
    "Deen Dayal Nagar",
    "Defence Colony",
    "Dehwa",
    "Deoghar",
    "Deokaliya Baksi",
    "Devamau",
    "Devareya",
    "Devariya",
    "Devkali",
    "Devpur",
    "Dha Dha Khera",
    "Dharmapur",
    "Dhatingra",
    "Dhawa",
    "Dhikunni",
    "Dhovaila",
    "Digara",
    "Diguria",
    "Diguriya",
    "Dihmehdi",
    "Dilar Nagar",
    "Dilshad Colony",
    "Divya Nagar",
    "Divya Nagar Vistar",
    "Dlf Colony",
    "Dlf Garden City",
    "Dobhi",
    "Dubagga",
    "Dubbaga",
    "Durgapuri",
    "E Block",
    "E-Block",
    "Eco Garden",
    "Ekata Nagar",
    "Ekta Nagar",
    "Eldeco Udyan",
    "Eldeco Udyan Ii",
    "Eldeco Udyani",
    "Evershine Nagar",
    "Faehganj",
    "Faizabad",
    "Faizabad .",
    "Faizabad Locality",
    "Faizabad Road",
    "Faizullaganj",
    "Faridipur",
    "Fazal Ganj",
    "Fazulla Ganj",
    "Fazullaganj",
    "Fazullahganj",
    "Firozpur",
    "Funtura Lucknow",
    "Gaddhipurwa",
    "Gadhewa",
    "Gahalwara",
    "Gahmar Kunj",
    "Gahru",
    "Gajpur Grint",
    "Gandan Kera",
    "Gandharvi",
    "Ganesh Ganj",
    "Ganesh Nagar",
    "Ganeshganj",
    "Ganeshpur",
    "Ganga Vihar",
    "Ganga Vihar Colony",
    "Gangjor",
    "Gangotri Vihar",
    "Garhi Sajar Khan",
    "Gaura",
    "Gaurabagh",
    "Gaurav Vihar Colony",
    "Gauri Bazaar",
    "Gauri Bazar",
    "Gautam Palli",
    "Gaya",
    "Gayatri Nagar",
    "Gayatri Vihar",
    "Geeta Palli",
    "Geeta Puri",
    "Ghaila",
    "Ghalia",
    "Ghasyari Mandi",
    "Ghausal Kalan",
    "Ghuswal Kalan",
    "Gindan Kera",
    "Gindan Khera",
    "Gindar Khera",
    "Gobindpur",
    "Goila",
    "Gokhale Vihar",
    "Gokulpur",
    "Gol Market",
    "Gola Ganj",
    "Golaganj",
    "Golf City",
    "Golg City",
    "Gomti Nagar",
    "Gomti Nagar Extension",
    "Gondwa",
    "Gopal Nagar",
    "Gopal Puri",
    "Gopalpuri",
    "Gopeshkhund",
    "Gopeshkunj",
    "Gopramau",
    "Goraiya",
    "Gorkha Rifles",
    "Gosai Purwa",
    "Gosaiganj",
    "Gosainganj",
    "Govind Nagar",
    "Green Avenue Colony",
    "Green City Colony",
    "Green View Apartments",
    "Green Woods Colony",
    "Gudamba",
    "Gudamba Thana",
    "Gujaini",
    "Gulab Vatika",
    "Gulabrai",
    "Gularai",
    "Gulzar Colony",
    "Gvalpur",
    "Gwari Village",
    "Gyanpur",
    "H.A.L. Colony",
    "H1 Block",
    "H2 Block",
    "Habibpur",
    "Habibulla Nagar",
    "Hahnemann Chauraha",
    "Haibat Mau",
    "Haiderganj",
    "Haivatpur",
    "Hajrat Ganj",
    "Hal Colony",
    "Hamidia",
    "Hamidpur",
    "Hans Khera",
    "Hanumant Puram 2Nd",
    "Haraipur",
    "Hardoi .",
    "Hardoi Road",
    "Hari Nagar",
    "Hari Om Nagar",
    "Harihar Nagar",
    "Hariharpur",
    "Hariherpur",
    "Harinagar",
    "Hariom Nagar",
    "Harsewakpur No. 2",
    "Hasanganj",
    "Hasangarden Colony",
    "Hasanpur",
    "Hathi Pur",
    "Hathipur",
    "Havelock Road Colony",
    "Hayat Nagar",
    "Hazaratpur",
    "Hazrat Ganj",
    "Hazratganj",
    "Heera Lal Nagar",
    "Hidu Khera",
    "Himalayan City",
    "Himmatpur",
    "Hind Nagar",
    "Hodson Lines",
    "Hriday Kheda",
    "Hulas Khera",
    "Husainabad",
    "Husainganj",
    "Husariya",
    "Huseria",
    "Hussainganj",
    "Ibrahimpur Manjhara",
    "Iffco Bazar",
    "Iim Road",
    "Ilyasganj",
    "Indira Nagar",
    "Indira Nagari",
    "Indiranagar B-Block Extension",
    "Indra Nagar",
    "Indraprastha Estate",
    "Indrapuri Colony",
    "Inhauna",
    "Iradat Nagar",
    "Ismail Nagar",
    "Ismailganj",
    "It Crossing",
    "Itarora Pikhini",
    "Itaunja",
    "J Block",
    "J-Block",
    "Jafar Khera",
    "Jafaria Colony",
    "Jagasura",
    "Jagdishpur",
    "Jai Narayan Nagar",
    "Jail Road",
    "Jail Road Colony",
    "Jajhanpur",
    "Jalalpur",
    "Jalayu Vihar",
    "Jalvayu Vihar",
    "Jamalpur Daduri",
    "Janakipuram",
    "Janki Nagar",
    "Jankipuram",
    "Jankipuram Extension",
    "Jankipuram Garden",
    "Jankipuram Phase 1",
    "Jankipuram Phase 2",
    "Jankipuram Vistar",
    "Jawahar Nagar",
    "Jehta",
    "Jiamau",
    "Jiamau Extension",
    "Jogamau",
    "Johari Mohalla",
    "Juggaur",
    "Jugor",
    "Junab Ganj",
    "K Block",
    "K-Block",
    "Kabir",
    "Kabirppur",
    "Kachhawa",
    "Kailashpuri",
    "Kaisarbagh",
    "Kaiser Bagh",
    "Kaiserbagh",
    "Kaiserganj",
    "Kajiapur",
    "Kakadev",
    "Kakoli",
    "Kakori",
    "Kakrabad",
    "Kala Kankar Colony",
    "Kaliya Khera",
    "Kalli Paschim",
    "Kalli Pashchim",
    "Kalli Poorab",
    "Kalpi Road",
    "Kalyan Pur",
    "Kalyanpur",
    "Kalyanpur East",
    "Kalyanpur West",
    "Kalyanpur(East)",
    "Kamalabad Barhauli",
    "Kamayani Nagar",
    "Kamla Nehru Nagar",
    "Kamlabad",
    "Kamta",
    "Kamta Chauraha",
    "Kamta Manas Garden Colony",
    "Kanak City",
    "Kanausi",
    "Kanc",
    "Kanchan Vihar Colony",
    "Kanchanpur",
    "Kankaha",
    "Kanpur",
    "Kanpur Road",
    "Kanpur Road Sector C",
    "Kanpur Road Sector H",
    "Kanpurroad",
    "Kanshiram Colony",
    "Kapera Madarpur.",
    "Kapoorthala",
    "Kapoorthla",
    "Karaundi",
    "Karbigawan Salempur",
    "Karbigawansadh",
    "Karbigwan",
    "Karim Ganj",
    "Karimabad",
    "Karowa",
    "Kasimpur Patri",
    "Kasons Lane",
    "Katari Tola",
    "Kathar",
    "Katibagiya",
    "Katra Bazar",
    "Katra Bizan Beg",
    "Katra Bizanbeg",
    "Katra Nagram",
    "Kendriya Vidyalya-2",
    "Kesa Colony",
    "Kesar Bagh",
    "Kesarbagh",
    "Kesari Nagar",
    "Keshav Nagar",
    "Khadra",
    "Khadra Lane",
    "Khaga",
    "Khajuha",
    "Khand 2",
    "Khand-2",
    "Khandedev",
    "Khandra",
    "Khanpur",
    "Khargapur",
    "Khargapur Jagir",
    "Khasarbara",
    "Khataiya",
    "Khatkeyana",
    "Khatwara",
    "Khayaliganj",
    "Khazoor Gaon",
    "Khurram Nagar",
    "Khurrampur",
    "Khushal Ganj",
    "Kiora Lucknow",
    "Kisan Path",
    "Kishan Bagh",
    "Kishunpur Kodia",
    "Kochha Bhanwar",
    "Kodararaypur",
    "Kolhapur",
    "Kondri Bholi",
    "Koriyani",
    "Koyla Nagar",
    "Krishna Nagar",
    "Krishna Nagar Colony",
    "Krishna Vihar",
    "Krishna Vihar Colony",
    "Krishnapuri Colony",
    "Kucha Tiwari",
    "Kuchi Khand",
    "Kudrat Vihar Colony",
    "Kuithar",
    "Kukri",
    "Kukura",
    "Kuriyani",
    "Kursi Nagar",
    "Kushbhita",
    "Kusumbhi",
    "Kutubpur",
    "Lajpat Nagar",
    "Lakhana Khera",
    "Lal Bagh",
    "Lal Kuan",
    "Lala Ka Purwa",
    "Lalbagh",
    "Lalkhera",
    "Lalkuan",
    "Laulai",
    "Lauly",
    "Launga Khera Kharika",
    "Laxmanpuri",
    "Laxmi Bai Marg",
    "Laxmi Nagar",
    "Laxmi Upwan",
    "Lda Colony",
    "Lda Sector 12",
    "Lda Sector 8",
    "Lehertara Industrial Estate",
    "Lilauli",
    "Lohta Bazar",
    "Lolai",
    "Lonha",
    "Lotus Panache",
    "Maanak Nagar",
    "Madhapur",
    "Madhawa Jalalpur",
    "Madhuban Colony",
    "Madhuban Nagar",
    "Madipur",
    "Maditaon",
    "Madiyanva",
    "Madiyaon",
    "Mahadevapuram Colony",
    "Mahak Nagar",
    "Mahanagar",
    "Mahanagar Colony",
    "Mahanagar Extension",
    "Maharaja Puram",
    "Maharia",
    "Maharshi Nagar",
    "Mahatva",
    "Mahavir Nagar",
    "Mahipatmau",
    "Mahmoodpur",
    "Mahtava",
    "Maityari",
    "Majhgaon",
    "Makanpur Colony",
    "Makhdoompur",
    "Makkaganj",
    "Malesemau",
    "Malhaur",
    "Malhour",
    "Malhour Station Area",
    "Malihabad",
    "Mall Avenue",
    "Mallpur",
    "Malsemau",
    "Malwa",
    "Malwan",
    "Manak Nagar",
    "Manas Nagar",
    "Manas Vihar",
    "Mandiyanva",
    "Mangal Pandey Marg",
    "Mangalwara",
    "Manjhauli",
    "Mannapur",
    "Manrauli",
    "Mansarovar Colony",
    "Mansarovar Yojana",
    "Manwa Khera",
    "Marble Market",
    "Martin Purva",
    "Maruti Puram",
    "Mastemau",
    "Mati Parvar Paschim",
    "Matiyari",
    "Matiyari Chauraha",
    "Mauaima",
    "Maukhera",
    "Maulviganj",
    "Maumiyan",
    "Maura",
    "Mausam Bagh",
    "Mawaiya",
    "Mawaiyya",
    "Mawaya",
    "Mayur Vihar",
    "Medhi Ganj",
    "Meenapur",
    "Meerut",
    "Mehboobganj",
    "Mehdauli",
    "Mehdiganj",
    "Mehendiganj",
    "Mehndi Tola",
    "Mehndia",
    "Mehndiganj",
    "Mehora",
    "Mendauli",
    "Mg Colony",
    "Millat Nagar",
    "Mini Stadium Area",
    "Mirai",
    "Mirza Ganj",
    "Mirzapur",
    "Misripur",
    "Miyaganj",
    "Model Town Colony",
    "Mohal Ganj",
    "Mohammadpur Majra",
    "Mohan",
    "Mohan Ganj",
    "Mohan Nagar",
    "Mohanlal Ganj",
    "Mohanlalganj",
    "Mohanlalgar",
    "Mohibulla Pur",
    "Mohibullapur",
    "Moolchand",
    "Moosabagh",
    "Moti Bagh",
    "Moti Jheel Colony",
    "Moti Nagar",
    "Mubarakpur",
    "Mufti Ganj",
    "Mufti Gunj",
    "Muftiganj",
    "Muhiuddinpur",
    "Mukaim Nagar",
    "Mulayam Nagar",
    "Munnu Khera",
    "Munshi Pulia",
    "Munshipuliya",
    "Murg Khana",
    "Musahib Ganj",
    "Musahibganj",
    "Muslim Nagar",
    "Mutkipur",
    "Mutkkipur",
    "Nadarganj",
    "Nagram",
    "Nai Basti",
    "Naibasti",
    "Najirabad",
    "Naka Hindola",
    "Nakhas",
    "Nakkhas",
    "Nanda Nagar",
    "Nandan Kanan",
    "Nanded",
    "Narayan Colony",
    "Narayan Nagar",
    "Narayan Puri",
    "Narayanpuri",
    "Narharpur",
    "Narhi",
    "Narpat Khera",
    "Narpatkhera",
    "Narwal",
    "Naseem Badh",
    "Nashik",
    "Natkur",
    "Nau Gawn",
    "Naubasta",
    "Naubasta Kala",
    "Nauigawan Gautam",
    "Nauraiya Khera",
    "Navinagar",
    "Nawab Ganj",
    "Nawal Kishore",
    "Naya Ganj",
    "Naya Gaon",
    "Naya Gaon East",
    "Naya Haidarabad",
    "Naya Khara",
    "Naya Khera",
    "Naya Purwa",
    "Nayaganj",
    "Nayagoan",
    "Nayapurwa",
    "Neelam Vihar Society",
    "Neelkanth Park",
    "Nehru Enclave",
    "Nehru Nagar",
    "Nehru Nagar A",
    "Neil Lines",
    "Ner Loco Colony",
    "New Azad Nagar",
    "New Colony",
    "New Defence Colony",
    "New Friends Colony",
    "New Ganeshganj",
    "New Haidar Ganj",
    "New Jail Road Area",
    "New Mahakali Nagar",
    "New Mehdauri",
    "New Najaf Rustam Nagar",
    "New Para Colony",
    "New Rahim Nagar",
    "Newazganj",
    "Nijampur",
    "Nijampur Majhigaon",
    "Nilmantha Cant",
    "Nilmatha",
    "Nilmatha Cantt",
    "Nindoora",
    "Nirala Nagar",
    "Nishat Ganj",
    "Nishatganj",
    "Niyazganj",
    "Nizampur East",
    "Noorpur Behata",
    "Nowgong",
    "Nweazganj",
    "Nyay Vihar Colony",
    "Nyaya Vihar Colony",
    "Officers Colony",
    "Om Nagar",
    "Om Nagar Rajajipuram",
    "Omaxe City",
    "Orhar",
    "P & T Quarters",
    "P And T Colony",
    "Pac Mod",
    "Paharpur",
    "Pahiaajampur",
    "Paikaramau",
    "Pakri",
    "Palenhada",
    "Palhri",
    "Pambhipur",
    "Pampapur Ghusval",
    "Pampapurghusval",
    "Panchvati Colony",
    "Pandey Ka Talab Colony",
    "Pani Gaon",
    "Panki Padaw",
    "Paper Mill Colony",
    "Papnamau",
    "Parakamal",
    "Paramhans Nagar",
    "Parsa",
    "Parsadi Khera Lucknow",
    "Parvar Poorab",
    "Pashchim Kshetra",
    "Patan",
    "Patel Nagar",
    "Pathak Pur",
    "Patna",
    "Patrakar Puram",
    "Patrakarpuram Colony",
    "Pawanpuri",
    "Pgi",
    "Phase 2",
    "Phase-2",
    "Phool Bagh",
    "Phoolbagh",
    "Pic Up Colopny",
    "Pichhor",
    "Piparsand",
    "Pirthi Nagar",
    "Pocket 9",
    "Pokhra Kalan",
    "Prabhat Nagar",
    "Prabhat Puram",
    "Pragati Kunj",
    "Prasad Nagar Colony",
    "Preeti Nagar",
    "Prem Nagar",
    "Prem Nagar Colony",
    "Prembagh",
    "Priyadarshini Colony",
    "Punjabi Tola",
    "Puraina",
    "Purana Qila",
    "Purana Quilla",
    "Purana Topkhana",
    "Purani Chungi",
    "Purania",
    "Purseni",
    "Purwa",
    "Pusgawan",
    "Pyare Pur",
    "Qaisarbagh",
    "Qaiser Bagh",
    "Qazi Ganj",
    "Rabindra Palli Colony",
    "Raebareli",
    "Raebareli Road",
    "Raghunath Nagar",
    "Raheem Nagar",
    "Rahim Nagar",
    "Rahimabad",
    "Rahimbadh",
    "Rahimnagar Padhiyana",
    "Rahmanpur",
    "Rahmapur",
    "Rail Nagar",
    "Rail Vihar Colony",
    "Railway Colony",
    "Raipur",
    "Raipur Phulwari",
    "Raipur Raja",
    "Rais Manjil",
    "Raitha",
    "Raj Bhawan Colony",
    "Raj Parapur",
    "Rajaji Puram",
    "Rajajipuram",
    "Rajapur Garheva",
    "Rajat Khand",
    "Rajeev Nagar",
    "Rajendra Nagar",
    "Rajendranagar",
    "Rajepur",
    "Rajiv Nagar",
    "Rajkot",
    "Rajkumar",
    "Rajni Khand",
    "Rakabganj",
    "Ram Nagar",
    "Ram Nagar Colony",
    "Ram Tej Swarup Singh",
    "Rambhan Khera",
    "Ramganj",
    "Ramgarh Urf Rajhi",
    "Ramjan Nagar",
    "Ramnagar",
    "Ramprasadkhera",
    "Rampur",
    "Rampuri",
    "Ran Swaad",
    "Rani Laxmi Bai Park Area",
    "Rania",
    "Raniya Mau",
    "Raqba",
    "Rashmi Khand",
    "Rasoolpur Iduria",
    "Rasoolpur Kasaytha",
    "Rasoolpur Sadat",
    "Rastogi Nagar",
    "Rasulabad",
    "Ratan Khand",
    "Ratan Khand-Ii",
    "Ratanpur",
    "Ratapur",
    "Rathindra Nagar",
    "Ravindrapalli",
    "Raya Bazar",
    "Rayabazar",
    "Rebha",
    "Rehmatnagar",
    "Rishi Nagar",
    "Rishita Manhattan",
    "River Bank Colony",
    "Robert Lines",
    "Roberts Lines",
    "Rooma",
    "Royal Nagar",
    "Ruchi Khand",
    "Ruchi Khand 2",
    "Ruchi Khand-Ii",
    "Rupkheda",
    "Saadatganj",
    "Saadatganj Baraura Hussain Bari",
    "Sabji Mandi",
    "Sabrahad",
    "Sachivalay Colony",
    "Sadar Bazaar",
    "Sadar Bazaar",
    "Sadarpur Karora",
    "Saddatganj",
    "Sadhiya",
    "Sadhupur",
    "Sadrauna",
    "Sahabad Grant",
    "Sahara City",
    "Sahara Estates",
    "Sahara States",
    "Sahinoor Colony",
    "Sahiyapur",
    "Sahzadpur",
    "Sai City",
    "Sai Mandir Road",
    "Saidapur",
    "Saidpur Jagir",
    "Sainik Nagar",
    "Saitha",
    "Sajjadbagh Colony",
    "Sajjadbahg Colony",
    "Saleh Nagar",
    "Samar Vihar Colony",
    "Samesee",
    "Sandhi Tola",
    "Sangam Vihar",
    "Sangam Vihar Colony",
    "Sanjay Gandhi Puram",
    "Sanjay Nagar",
    "Sanjaygandhi Puram",
    "Sanskriti Enclave",
    "Sapru",
    "Sarafa Bazar",
    "Sarai Gopal",
    "Sarai Gopi",
    "Sarai Hawa Khawah",
    "Sarai Khawaja",
    "Sarai Madho",
    "Sarai Mali Khera",
    "Sarai Sahjadi",
    "Sarai Sekh",
    "Sarai Shekh",
    "Sarai Teli",
    "Sarainkalu",
    "Saraipasi",
    "Saraishekh",
    "Saraiya",
    "Saraswati Nagar",
    "Saraswati Puram",
    "Saray Karora",
    "Sarfarazganj",
    "Sari Pura",
    "Sarojini Nagar",
    "Sarora",
    "Sarosa Bharosa",
    "Sarsanda",
    "Sarsawa",
    "Sarsawan",
    "Sarson",
    "Sarswan",
    "Sarvoday Nagar",
    "Sarvodaya Nagar",
    "Satetipatti Gaja",
    "Satrikh",
    "Satrikh Road",
    "Schumacher Colony",
    "Sec Tor 18",
    "Sector - F",
    "Sector 1",
    "Sector 10",
    "Sector 11",
    "Sector 12",
    "Sector 13",
    "Sector 14",
    "Sector 16",
    "Sector 18",
    "Sector 18, Indira Nagar",
    "Sector 19",
    "Sector 2",
    "Sector 20",
    "Sector 22",
    "Sector 3",
    "Sector 4",
    "Sector 5",
    "Sector 6",
    "Sector 6 A",
    "Sector 6C",
    "Sector 7",
    "Sector 7 A",
    "Sector 7A",
    "Sector 8",
    "Sector 82",
    "Sector 9",
    "Sector 9 B",
    "Sector 93",
    "Sector 9B",
    "Sector A",
    "Sector B",
    "Sector B Ansal Api",
    "Sector C",
    "Sector D",
    "Sector D1",
    "Sector E",
    "Sector F",
    "Sector F Extension",
    "Sector G",
    "Sector H",
    "Sector K",
    "Sector M",
    "Sector M, Jankipuram",
    "Sector M1",
    "Sector N",
    "Sector N1",
    "Sector P",
    "Sector Q",
    "Sector-1",
    "Sector-12",
    "Sector-7",
    "Sector-B",
    "Sekhana Pur",
    "Semra",
    "Semra Gauri",
    "Senani Vihar",
    "Shagun City",
    "Shaheed Nagar",
    "Shaheed Path",
    "Shaheed Path Localities",
    "Shahganj",
    "Shahinoor Colony",
    "Shahmau",
    "Shahmina",
    "Shahmina Road",
    "Shahpur",
    "Shaidham Colony",
    "Shakti Nagar",
    "Shalimar Garden Main B-Block",
    "Shalimar Square",
    "Shankar Khera",
    "Shankar Puri",
    "Shankar Vihar Colony",
    "Shanker Khera",
    "Shanker Vihar",
    "Shanti Nagar",
    "Sharakpur",
    "Sharda Colony",
    "Sharda Nagar",
    "Shaurya Vihar Colony",
    "Sheikhpur",
    "Sheikhpur Kasaila",
    "Shekhpur",
    "Shekhpura",
    "Shekhupura",
    "Sherwani Nagar",
    "Shia Lines",
    "Shishupur",
    "Shiv Puri Colony",
    "Shivaji Puram",
    "Shivajipuram",
    "Shivani Vihar",
    "Shivari",
    "Shivgarh",
    "Shivlok",
    "Shivpuram Colony",
    "Shyam Enclave",
    "Shyam Nagar",
    "Shyam Nagar West",
    "Shyam Vihar",
    "Shyam Vihar Colony",
    "Sibt Ganj",
    "Siddhartha Nagar",
    "Sikandar Bagh",
    "Sikander Khurd",
    "Sikander Pur",
    "Sikandrur Karan",
    "Sikar",
    "Sikrauri",
    "Siliguri",
    "Simardha",
    "Sindhu Nagar",
    "Sindhunagar",
    "Singar Nagar",
    "Singrawan",
    "Sisandi",
    "Sita Vihar Colony",
    "Sitapur Bypass",
    "Sitapur Locality",
    "Sitapur Road",
    "Site No.1",
    "Smriti Vihar",
    "Somnath Dwar",
    "Sondhi Tola",
    "Sonu Gupta",
    "South City",
    "Staff Colony",
    "Subhash Nagar",
    "Subhauli",
    "Suirish",
    "Sujanpura",
    "Sujanpura Crossing",
    "Sujatganj",
    "Sulsa Mau",
    "Sultanpur",
    "Sultanpur .",
    "Sultanpur Road",
    "Sun City Colony",
    "Sunder Nagar",
    "Sunrise Apartments",
    "Suraksha Enclave",
    "Surender Nagar",
    "Surya Nagar",
    "Sushanpura",
    "Sushant Golf City",
    "Swapnalok Colony",
    "Swapnlok Colony",
    "Swarnim Vihar",
    "Swastik Granite",
    "Tadikhana",
    "Tadkeshwar",
    "Tahseen Ganj",
    "Tajganj",
    "Takrohi",
    "Talkatora",
    "Tamoriya",
    "Tarabganj",
    "Targaon",
    "Tarhia",
    "Taura",
    "Tedhi Pulia",
    "Tedhipuliya Crossing",
    "Tehri Puliya",
    "Tejipur",
    "Telibagh",
    "Telibagh Extension",
    "Tera Khas",
    "Thakur Gunj",
    "Thakurganj",
    "Thakurganj.",
    "Tharepah",
    "Thasemau",
    "The Mall Avenue",
    "Tikait Rai Talab",
    "Tikaitganj",
    "Tikapur",
    "Tikari Khurd",
    "Tikariya",
    "Tikri",
    "Tindola",
    "Tiwari Bagh",
    "Tiwariganj",
    "Tiwaripur",
    "Tiwaripura",
    "Transport Nagar",
    "Trilokpur",
    "Trimurti Nagar",
    "Tripathi Nagar",
    "Triveni Nagar",
    "Tulsi Das Khera",
    "Tulsidas Ghat",
    "Turaiganj",
    "Turi Raja Sahib",
    "Turichhabnath",
    "Tusail",
    "Type 2 Pwd Colony",
    "Type Iii Pwd Colony",
    "Uattardhona",
    "Udaiganj",
    "Udayganj",
    "Udyan",
    "Udyan-Ii Colony",
    "Ujariyaon",
    "Umambhari",
    "Umar Bhari",
    "Umarbhari",
    "Unity City Colony",
    "Usman Pur",
    "Vadodara",
    "Vardaan Khand",
    "Vardan Khand",
    "Vasai-Virar",
    "Vasant Khand",
    "Vasant Kunj",
    "Vasant Vihar",
    "Vastu Khand",
    "Veer Bahadur Puram",
    "Vibhav Khand",
    "Vibhuti Khand",
    "Vidya Nagar",
    "Vigyan Khand",
    "Vijaipur Colony",
    "Vijay Khand",
    "Vijay Nagar",
    "Vijayant Khand",
    "Vijyant Khand",
    "Vikalp Khand",
    "Vikas Khand",
    "Vikas Nagar",
    "Vikas Vihar Colony",
    "Vikram Nagar",
    "Vikram Shila Colony",
    "Vikramshila Colony",
    "Vikrant Khand",
    "Vinamra Khand",
    "Vinay Khand",
    "Vinay Khand-3",
    "Vinay Khand-4",
    "Vinay Nagar",
    "Vineet Khand",
    "Vinnet Khand",
    "Vinnet Khand 1",
    "Vipul Khand",
    "Vipul Khand-2",
    "Viraj Khand",
    "Viraj Khand-1",
    "Viram Khand",
    "Viram Khand 1",
    "Viram Khand 5",
    "Viram Khand-1",
    "Virat Khand",
    "Virat Khand 2",
    "Virat Nagar",
    "Vishal Khand",
    "Vishal Khand 3",
    "Vishal Khand Extension",
    "Vishesh Khand",
    "Vishesh Khand-4",
    "Vishnulok Colony",
    "Vishwas Khand",
    "Visnhu Lok Colony",
    "Viunamra Khand",
    "Vivek Khand",
    "Vivek Khand-2",
    "Vivek Khand-3",
    "Vivekanand Puri",
    "Vivekananda Colony",
    "Vrindavan Colony",
    "Vrindavan Yojna",
    "Vrindavan Yojna - 2",
    "Vrindavan Yojna-2",
    "W Block",
    "Wazirbagh Mohallah",
    "Y Block",
    "Yahiyaganj",
    "Yamunapuram Colony",
    "Yaseen Ganj",
    "Yusuf Nagar",
    "Zehra Colony",
  ];

  // Add this new state for search
  const [searchQuery, setSearchQuery] = useState("");

  // Add new state for search results
  const [searchResults, setSearchResults] = useState({
    localities: [],
    areas: [],
  });
  const [showSearchPanel, setShowSearchPanel] = useState(false);

  // Add this state for tracking window width
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Add a new ref for the search panel
  const searchPanelRef = useRef(null);

  // Add useEffect to handle clicks outside the panel
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        searchPanelRef.current &&
        !searchPanelRef.current.contains(event.target)
      ) {
        setShowSearchPanel(false);
      }
    }

    // Add event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const fetchFavouriteProperties = async () => {
      try {
        if (!authState?.userData?.id) {
          return;
        }

        const token = localStorage.getItem("token");

        const response = await axios.post(
          `${BASE_URL}user/getFavourites`,
          {
            userId: authState.userData.id,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const favouriteList = response.data.favouritesList.favourites;

        console.log(favouriteList);

        setFavouriteList(favouriteList);
      } catch (error) {
        console.log("Error fetching favourite properties:", error);
      }
    };
    fetchFavouriteProperties();
  }, []);

  // Add useEffect to handle window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function refresh() {
    window.location.reload(false);
  }

  function handleOpen() {
    SetIsOpen(!isOpen);
  }
  function handleHamburger() {
    SetHamburger(!Hamburger);
  }
  function handleLocation() {
    setLocation(!Location);
    setShowSelectCity(!showSelectCity);
  }
  const { slug } = useParams();
  function handleMode() {
    setMode(!mode);
  }
  function handleShowCity() {
    if (city) {
      setShowCity(!showCity);
    }
  }
  function handleShowArea() {
    if (selectedLocality) {
      setShowArea(!showArea);
    }
  }
  function addLocality(area) {
    setSelectedArea(area);
    if (selectedArea.includes(area)) {
      selectedArea.splice(selectedArea.indexOf(area), 1);
      setSelectedArea([...selectedArea]);
    } else {
      setSelectedArea([...selectedArea, area]);
    }
  }

  const resetFilters = () => {
    setFilters({
      bhk: [],
      residential: [],
      commercial: [],
      preferenceHousing: "",
      genderPreference: "",
      houseType: [],
    });
  };

  const fetchAndFilterProperties = async (
    selectedCity,
    selectedArea,
    selectedLocality
  ) => {
    setLoading(true);

    try {
      let cleanedFilters = {
        ...filters,
        bhk: filters.bhk.map((bhk) => bhk.replace(/[^0-9]/g, "")),
      };

      if (residential) {
        cleanedFilters = {
          ...filters,
          residential: [residential],
        };
      }

      if (commercial) {
        cleanedFilters = {
          ...filters,
          commercial: [commercial],
        };
      }

      let queryString = Object.keys(cleanedFilters)
        .filter(
          (key) => cleanedFilters[key].length > 0 || cleanedFilters[key] !== ""
        )
        .map((key) => {
          const value = Array.isArray(cleanedFilters[key])
            ? cleanedFilters[key].map(encodeURIComponent).join(",")
            : encodeURIComponent(cleanedFilters[key]);
          return `${encodeURIComponent(key)}=${value}`;
        })
        .join("&");

      if (selectedCity) {
        queryString = queryString + `&city=${encodeURIComponent(selectedCity)}`;
        if (selectedArea.length > 0) {
          queryString =
            queryString +
            `&area=${selectedArea.map(encodeURIComponent).join(",")}`;
        } else if (selectedLocality) {
          queryString =
            queryString + `&locality=${encodeURIComponent(selectedLocality)}`;
        }
      }

      queryString = queryString + `&page=${currentPage}`;

      const url = `${BASE_URL}property/filter?${queryString}`;
      // console.log("Request URL:", url); // Log the constructed URL

      try {
        const response = await axios.get(url);
        let propertyData = response.data.data; // Store the response data
        // console.log(propertyData);

        // If no data is found for the area, fall back to the locality
        if (
          propertyData.length === 0 &&
          selectedArea.length > 0 &&
          selectedLocality
        ) {
          queryString = queryString.replace(
            /&area=[^&]*/,
            `&locality=${encodeURIComponent(selectedLocality)}`
          );
          const fallbackUrl = `${BASE_URL}property/filter?${queryString}`;
          // console.log("Fallback Request URL:", fallbackUrl); // Log the fallback URL
          const fallbackResponse = await axios.get(fallbackUrl);
          propertyData = fallbackResponse.data.data;
        }

        // Sort by created date if needed
        if (propertyData && Array.isArray(propertyData)) {
          propertyData.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
        }

        setProperties(propertyData); // Update properties with the sorted results
        setTotalPages(response.data.totalPages || 1);

        // Check if no properties were found
        setNoPropertiesFound(propertyData.length === 0);

        // Handle sorting if needed
        const searchParams = new URLSearchParams(location.search);
        const sortType = searchParams.get("sort");
        if (sortType && Array.isArray(propertyData)) {
          sortProperties(propertyData, sortType);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }

      setLoading(false);
    } catch (error) {
      console.error("Error fetching properties:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const cityParam = params.get("city");
    const areaParam = params.get("area") ? params.get("area").split(",") : [];
    const localityParam = params.get("locality");

    setCurrentPage(1);
    fetchAndFilterProperties(
      cityParam || city,
      areaParam.length > 0 ? areaParam : [],
      localityParam || ""
    );
  }, [city, location.search]); // Add city to the dependency array

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const cityParam = params.get("city");
    const areaParam = params.get("area") ? params.get("area").split(",") : [];
    const localityParam = params.get("locality");

    fetchAndFilterProperties(
      cityParam || city,
      areaParam.length > 0 ? areaParam : [],
      localityParam || ""
    );
  }, [currentPage]);

  // useEffect(() => {
  //   setCurrentPage(1); // Reset to page 1 when these filters change
  // }, [city, selectedLocality, selected Area]);

  // Sorting logic
  const sortProperties = (properties, sortType) => {
    let sortedProperties = [...properties];

    if (sortType === "price-low-high") {
      sortedProperties.sort((a, b) => a.rent - b.rent);
    } else if (sortType === "price-high-low") {
      sortedProperties.sort((a, b) => b.rent - a.rent);
    } else if (sortType === "most-trending") {
      sortedProperties.sort((a, b) => b.reviews.length - a.reviews.length);
    } else if (sortType === "date-uploaded") {
      sortedProperties.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    }

    setProperties(sortedProperties);
  };

  const handleSortClick = (sortType) => {
    const queryParams = new URLSearchParams(location.search);
    queryParams.set("sort", sortType);
    navigate(`?${queryParams.toString()}`); // Update URL with new sort query
  };

  const handleLocalitySelect = (locality) => {
    setSelectedLocality(locality); // Update selected locality
  };

  // Add this function to handle search
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    if (query.length === 0) {
      setShowSearchPanel(false);
      return;
    }

    // Filter localities based on selected city
    const matchingLocalities = city
      ? citylocalities[city].filter((locality) =>
          locality.toLowerCase().startsWith(query)
        )
      : [];

    // Filter areas
    const matchingAreas = areas.filter((area) =>
      area.toLowerCase().startsWith(query)
    );

    setSearchResults({
      localities: matchingLocalities,
      areas: matchingAreas,
    });
    setShowSearchPanel(true);
  };
  const handleSearchSelection = (value, type) => {
    const queryParams = new URLSearchParams(location.search);

    if (type === "locality") {
      handleLocalitySelect(value);
      queryParams.set("locality", value);
    } else {
      addLocality(value);
      const currentAreas = selectedArea.includes(value)
        ? selectedArea.filter((area) => area !== value)
        : [...selectedArea, value];

      if (currentAreas.length > 0) {
        queryParams.set("area", currentAreas.join(","));
      } else {
        queryParams.delete("area");
      }
    }

    setSearchQuery("");
    setShowSearchPanel(false);

    // Update the URL with the new search parameter
    navigate(`${location.pathname}?${queryParams.toString()}`);

    // Trigger fetchAndFilterProperties with the selected city and new search parameter
    fetchAndFilterProperties(
      city,
      queryParams.get("area") ? queryParams.get("area").split(",") : [],
      queryParams.get("locality") || ""
    );
  };
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader color="#6CC1B6" size={150} />
      </div>
    );
  }
  const handleAddPropertybtn = () => {
    if (authState.status === true && localStorage.getItem("token")) {
      navigate("/landlord-dashboard", { state: { content: "AddProperty" } });
    } else {
      // toast.error("Please Log In first");
      navigate("/login");
    }
  };
  const compare = () => {
    navigate("/compare-property");
  };
  const updateFilterCount = (count) => {
    setFilterCount(count);
  };

  return (
    <>
      <div
        onClick={() => {
          if (Location === true) setLocation(false);
          if (isOpen === true) SetIsOpen(false);
        }}
        className={`bg-black opacity-80 h-[2600px] absolute z-20 ${
          isOpen || Hamburger || Location ? "block" : "hidden"
        }`}
      ></div>
      <section
        onClick={() => {
          if (mode === true) setMode(false);
          if (Location === true) setLocation(false);
          if (showCity === true) setShowCity(false);
          if (isOpen === true) SetIsOpen(false);
        }}
        className="property h-[100vh] pb-14 px-12 w-full overflow-y-auto"
        id="property"
      >
        {/* <div className="container mx-auto  px-10"> */}
        <div className=" flex flex-col gap-6 py-6 sticky top-0 z-20 bg-black">
          <div className="hidden flex items-center justify-between">
            <p className="lg:text-[45px] md:text-4xl text-[#C8A21C] font-bold">
              Property Listing
            </p>
            <img
              src={hamburger}
              alt="Hamburger Menu"
              className=" lg:w-12 md:w-11 w-9 h-auto"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 text-sm md:text-lg">
            {/* Search bar section - spans 8 columns on larger screens */}
            <div className="bg-white sm:col-span-8 md:col-span-6 rounded-md w-full">
              <div className="flex flex-wrap items-center text-black  text-sm md:text-lg">
                {/* Location Logic */}
                <div
                  className="flex items-center gap-4 px-3 py-2 my-1  shrink-0 border-r border-black"
                  onClick={handleLocation}
                >
                  <div className="py-1 px-1 hover:cursor-pointer">
                    <p>{!city || Location ? "Select City" : city}</p>
                  </div>
                  <div className="items-center cursor-pointer">
                    <img
                      src={drop}
                      alt="Dropdown"
                      // onClick={handleLocation}
                      className="cursor-pointer"
                    />
                  </div>
                  <SelectLocation
                    Location={Location}
                    setLocation={setLocation}
                    onLocationSelect={(selectedCity) => {
                      resetFilters();
                      navigate(`/property-listing/${selectedCity}`);
                      setLocation(false);
                    }}
                  />
                </div>

                {/* Search Input */}
                <div className="flex-1 min-w-0 flex items-center gap-2 px-4 my-1 text-sm md:text-lg">
                  <FaSearch className="text-black shrink-0" />
                  <div className="flex flex-wrap items-center gap-1 py-2 w-full overflow-x-hidden">
                    {selectedLocality && (
                      <div className="flex items-center gap-1 bg-[#EED98B] px-2 py-1 rounded-full shrink-0">
                        <span className="text-sm">{selectedLocality}</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 cursor-pointer"
                          onClick={() => {
                            setSelectedLocality("");

                            // Update the URL parameters
                            const queryParams = new URLSearchParams(
                              location.search
                            );
                            queryParams.delete("locality");
                            navigate(
                              `${location.pathname}?${queryParams.toString()}`
                            );

                            // Trigger fetchAndFilterProperties with the updated parameters
                            fetchAndFilterProperties(city, selectedArea);
                          }}
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    )}
                    {selectedArea.map((area) => (
                      <div
                        key={area}
                        className="flex items-center bg-[#EED98B] px-2 py-1 rounded-full shrink-0"
                      >
                        <span className="text-sm">{area}</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 cursor-pointer"
                          onClick={() => {
                            const newAreas = selectedArea.filter(
                              (a) => a !== area
                            );
                            setSelectedArea(newAreas);

                            // Update the URL parameters
                            const queryParams = new URLSearchParams(
                              location.search
                            );
                            if (newAreas.length > 0) {
                              queryParams.set("area", newAreas.join(","));
                            } else {
                              queryParams.delete("area");
                            }
                            navigate(
                              `${location.pathname}?${queryParams.toString()}`
                            );

                            // Trigger fetchAndFilterProperties with the updated areas
                            fetchAndFilterProperties(
                              city,
                              newAreas,
                              selectedLocality
                            );
                          }}
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    ))}
                    <input
                      type="text"
                      placeholder={
                        windowWidth < 768
                          ? "Search..."
                          : "Search by Locality or Area..."
                      }
                      value={searchQuery}
                      onClick={(e) => {
                        if (!city) {
                          alert("Please select a city first");
                          return;
                        }
                      }}
                      onChange={(e) => {
                        handleSearch(e);
                      }}
                      className="outline-none bg-transparent text-black placeholder-gray-500 min-w-[100px] flex-1"
                    />
                  </div>

                  {/* Search Results Panel */}
                  {showSearchPanel &&
                    (searchResults.localities.length > 0 ||
                      searchResults.areas.length > 0) && (
                      <div
                        ref={searchPanelRef}
                        className="absolute top-20 left-36 mt-2 w-1/4 bg-white rounded-lg shadow-lg z-50 max-h-[300px] overflow-y-auto"
                      >
                        {[
                          ...searchResults.localities,
                          ...searchResults.areas,
                        ].map((item, index) => {
                          const isLocality =
                            searchResults.localities.includes(item);
                          return (
                            <div
                              key={`${
                                isLocality ? "locality" : "area"
                              }-${index}`}
                              className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-black flex items-center justify-between"
                              onClick={() =>
                                handleSearchSelection(
                                  item,
                                  isLocality ? "locality" : "area"
                                )
                              }
                            >
                              <span className="text-black">{item}</span>
                              <span className="text-gray-500 min-w-[60px]">
                                {isLocality ? "Locality" : "Area"}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    )}
                </div>

                {/* Filters logic */}
                <div
                  className="flex items-center gap-2 border-l px-3 border-black shrink-0 cursor-pointer"
                  onClick={handleOpen}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-sm md:text-lg whitespace-nowrap">
                      Filters
                    </span>
                    <img src={drop} alt="Dropdown" className="cursor-pointer" />
                  </div>
                </div>

                {/* SORT LOGIC */}
                <div
                  className="flex items-center gap-2 border-l pl-3 border-black shrink-0 cursor-pointer"
                  onClick={handleMode}
                >
                  <span className="text-sm md:text-lg whitespace-nowrap">
                    Sort
                  </span>
                  <img
                    src={drop}
                    alt="Dropdown"
                    className={`${
                      mode ? "rotate-180" : "rotate-0"
                    } cursor-pointer`}
                  />
                  <div className="relative text-sm lg:text-lg">
                    <div
                      className={`${
                        mode ? "block" : "hidden"
                      } z-50 absolute bg-white shadow-lg rounded-lg text-center w-40 py-3 top-[30px] left-[-150px] sm:top-[36px] sm:left-[-110px]`}
                    >
                      <p
                        className="border-b-2 py-2 font-medium cursor-pointer hover:bg-gray-100"
                        onClick={() => {
                          handleSortClick("price-low-high"), setMode(false);
                        }}
                      >
                        Price: Low to High
                      </p>
                      <p
                        className="border-b-2 py-2 font-medium cursor-pointer hover:bg-gray-100"
                        onClick={() => {
                          handleSortClick("price-high-low"), setMode(false);
                        }}
                      >
                        Price: High to Low
                      </p>
                      <p
                        className="py-2 font-medium cursor-pointer hover:bg-gray-100"
                        onClick={() => {
                          handleSortClick("most-trending"), setMode(false);
                        }}
                      >
                        Most Trending
                      </p>
                      <p
                        className="py-2 font-medium cursor-pointer hover:bg-gray-100"
                        onClick={() => {
                          handleSortClick("date-uploaded"), setMode(false);
                        }}
                      >
                        Date Uploaded
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Compare and Add Property buttons - span 4 columns together */}
            <div className="sm:col-span-4 md:col-span-6 flex gap- items-center justify-between">
              {compareProperty.length >= 2 && (
                <div className="compare" onClick={compare}>
                  <button
                    className={`bg-white h-12 sm:h-14 w-32 text-black rounded-lg flex gap-5 text-center items-center py-3 px-6 font-medium ${
                      compareProperty.length <= 0
                        ? "opacity-50 grayscale cursor-not-allowed"
                        : ""
                    }`}
                    disabled={compareProperty.length <= 1}
                  >
                    Visit
                    <div className="bg-[#EED98B] rounded-full flex items-center justify-center px-2">
                      {compareProperty.length}
                    </div>
                  </button>
                </div>
              )}

              <div className="hidden">
                <a
                  onClick={handleAddPropertybtn}
                  className="bg-white w-30 h-12 sm:h-14 text-black flex items-center justify-center px-5 rounded-lg cursor-pointer"
                >
                  Add a property
                </a>
              </div>
            </div>
          </div>
        </div>

        <div
          onClick={() => {
            if (isOpen === true) SetIsOpen(false);
          }}
          className={`min-w-full min-h-fit absolute z-30 top-10 flex items-center justify-center ${
            isOpen ? "block" : "hidden"
          } `}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-[18rem] top-[89px] sm:top-28 -right-[0px] m-4 sm:right-[28.8rem]"
          >
            <Filters
              SetIsOpen={SetIsOpen}
              setProperties={setProperties}
              city={city}
              updateFilterCount={updateFilterCount}
              filterCount={filterCount}
              setTotalPages={setTotalPages}
              filters={filters}
              setFilters={setFilters}
              resetFilters={resetFilters}
              fetchAndFilterProperties={fetchAndFilterProperties}
              setCurrentPage={setCurrentPage}
            />
            {/* <div className="absolute top-1 right-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                onClick={handleOpen}
                className="cursor-pointer w-5 lg:w-6 md:w-6 z-50 text-red-400 hover:text-red-800 transition-colors duration-300"
              >
                <path
                  fillRule="evenodd"
                  d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L8.586 12 5.47 6.53a.75.75 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div> */}
          </div>
        </div>

        {properties.length === 0 ? (
          <p className="text-center text-lg font-semibold mt-10">
            No properties found
          </p>
        ) : (
          <Cards
            properties={properties}
            favouriteList={favouriteList}
            setFavouriteList={setFavouriteList}
          />
        )}
      </section>

      <Pagination
        properties={properties}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />
    </>
  );
};

export default Listing;
