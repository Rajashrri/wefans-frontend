import React from "react";
import { Navigate } from "react-router-dom";

// Authentication related pages
import Login from "../pages/Authentication/Login";
import Logout from "../pages/Authentication/Logout";
import Register from "../pages/Authentication/Register";
import ForgetPwd from "../pages/Authentication/ForgetPassword";
import AuthLockScreen from "../pages/Authentication/AuthLockScreen";
import Otp from "../pages/Authentication/Otp";
import ForgotOtp from "../pages/Authentication/ForgotOtp";
import ResetPwd from "../pages/Authentication/ResetPwd";
import Privileges from  "../pages/RoleMaster/Privileges";

// Dashboard
import Dashboard from "../pages/Dashboard/index";

// Pages Calendar
import Calendar from "../pages/Calendar/Calendar";

// Pages Component
import Chat from "../pages/Chat/Chat";

//Ecommerce Pages
import EcommerceProducts from "../pages/Ecommerce/EcommerceProducts/index";
import EcommerceProductDetail from "../pages/Ecommerce/EcommerceProducts/EcommerceProductDetail";
import EcommerceOrders from "../pages/Ecommerce/EcommerceOrders/index";
import EcommerceCustomers from "../pages/Ecommerce/EcommerceCustomers/index";
import EcommerceCart from "../pages/Ecommerce/EcommerceCart";
import EcommerceCheckout from "../pages/Ecommerce/EcommerceCheckout";
import EcommerceShops from "../pages/Ecommerce/EcommerceShops/index";
import EcommerceAddProduct from "../pages/Ecommerce/EcommerceAddProduct";

//Email
import EmailInbox from "../pages/Email/email-inbox";
import EmailRead from "../pages/Email/email-read";

// Charts
import ChartApex from "../pages/Charts/Apexcharts";
import ChartjsChart from "../pages/Charts/ChartjsChart";
import SparklineChart from "../pages/Charts/SparklineChart";
import ChartsKnob from "../pages/Charts/jquery-knob";

// Maps
import MapsGoogle from "../pages/Maps/MapsGoogle";
import MapsVector from "../pages/Maps/MapsVector";

//Icons
import RemixIcons from "../pages/Icons/RemixIcons";
import MaterialDesign from "../pages/Icons/MaterialDesign";
import DripiIcons from "../pages/Icons/DripiIcons";
import FontAwesome from "../pages/Icons/FontAwesome";

//Utility
import StarterPage from "../pages/Utility/StarterPage";
import Maintenance from "../pages/Utility/Maintenance";
import CommingSoon from "../pages/Utility/CommingSoon";
import Timeline from "../pages/Utility/Timeline";
import FAQs from "../pages/Utility/FAQs";
import Pricing from "../pages/Utility/Pricing";
import Error404 from "../pages/Utility/Error404";
import Error500 from "../pages/Utility/Error500";

// Forms
import FormElements from "../pages/Forms/FormElements";
import FormAdvanced from "../pages/Forms/FormAdvanced";
import FormEditors from "../pages/Forms/FormEditors";
import FormValidations from "../pages/Forms/FormValidations";
import FormMask from "../pages/Forms/FormMask";
import FormUpload from "../pages/Forms/FormUpload";
import FormWizard from "../pages/Forms/FormWizard";

//Ui
import UiAlert from "../pages/Ui/UiAlert";
import UiButtons from "../pages/Ui/UiButtons";
import UiCards from "../pages/Ui/UiCards";
import UiCarousel from "../pages/Ui/UiCarousel";
import UiDropdown from "../pages/Ui/UiDropdown";
import UiGeneral from "../pages/Ui/UiGeneral";
import UiGrid from "../pages/Ui/UiGrid";
import UiImages from "../pages/Ui/UiImages";
import UiLightbox from "../pages/Ui/UiLightbox";
import UiModal from "../pages/Ui/UiModal";
import UiProgressbar from "../pages/Ui/UiProgressbar";
import UiTabsAccordions from "../pages/Ui/UiTabsAccordions";
import UiTypography from "../pages/Ui/UiTypography";
import UiVideo from "../pages/Ui/UiVideo";
import UiSessionTimeout from "../pages/Ui/UiSessionTimeout";
import UiRating from "../pages/Ui/UiRating";
import UiRangeSlider from "../pages/Ui/UiRangeSlider";
import UiNotifications from "../pages/Ui/ui-notifications";
import UIRoundSlider from "../pages/Ui/UIRoundSlider";

//Tables
import BasicTables from "../pages/Tables/BasicTables";
import DatatableTables from "../pages/Tables/DatatableTables";
import ResponsiveTables from "../pages/Tables/ResponsiveTables";

// Inner Authentication
import Login1 from "../pages/AuthenticationInner/Login";
import Register1 from "../pages/AuthenticationInner/Register";
import ForgetPwd1 from "../pages/AuthenticationInner/ForgetPassword";

//Professionallist
import Professionallist from "../pages/ProfessionalMaster/Professionallist";
import AddProfessional from "../pages/ProfessionalMaster/AddProfessional";
import UpdateProfessional from "../pages/ProfessionalMaster/UpdateProfessional";
import Timelinelist from "../pages/Timeline/Timelinelist";
import AddTimeline from "../pages/Timeline/AddTimeline";
import UpdateTimeline from "../pages/Timeline/UpdateTimeline";

import CustomOptionlist from "../pages/CustomOption/CustomOptionlist";
import AddCustomOption from "../pages/CustomOption/AddCustomOption";
import UpdateCustomOption from "../pages/CustomOption/UpdateCustomOption";

import SectionMasterList from "../pages/SectionMaster/SectionMasterList";
import AddSectionMaster from "../pages/SectionMaster/AddSectionMaster";
import UpdateSectionMaster from "../pages/SectionMaster/UpdateSectionMaster";

import LanguageList from "../pages/LanguageMaster/LanguageList";
import TriviaTypesList from "../pages/TriviaTypes/TriviaTypesList";
import SectionTemplateList from "../pages/SectionTemplate/SectionTemplateList";

import Template from "../pages/Template/TemplateView";
import TemplateList from "../pages/Template/TemplateList";

import TemplateEdit from "../pages/Template/TemplateEdit";


import SocialLinkList from "../pages/SocialLink/SocialLinkList";
import GenreMasterList from "../pages/GenreMaster/GenreMasterList";

import CelebratyList from "../pages/Celebraty/CelebratyList";
import AddCelebraty from "../pages/Celebraty/AddCelebraty";
import UpdateCelebraty from "../pages/Celebraty/UpdateCelebraty";

import AddSection from "../pages/Section/AddMovie";
import ListMoviev from "../pages/Section/ListMoviev";

import UpdateMoviev from "../pages/Section/UpdateMovie";

import AddSeries from "../pages/Section/AddSeries";
import ListSeries from "../pages/Section/ListSeries";

import UpdateSeries from "../pages/Section/UpdateSeries";

import AddElection from "../pages/Section/AddElection";
import ListElection from "../pages/Section/ListElection";

import UpdateElection from "../pages/Section/UpdateElection";

import AddPositions from "../pages/Section/AddPositions";
import ListPositions from "../pages/Section/ListPositions";

import UpdatePositions from "../pages/Section/UpdatePositions";

import TriviaentriesList from "../pages/Triviaentries/TriviaentriesList";

import CreateTriviaentries from "../pages/Triviaentries/add";
import UpdateTriviaentries from "../pages/Triviaentries/UpdateTriviaentries";

import Testimonialslist from "../pages/Testimonials/Testimonialslist";
import AddTestimonials from "../pages/Testimonials/AddTestimonials";
import UpdateTestimonials from "../pages/Testimonials/UpdateTestimonials";

import Profile from "../pages/profile/Profile";


import RoleMasterList from "../pages/RoleMaster/RoleMasterList";
import EmployeeList from "../pages/Employee/EmployeeList";
import CreateEmploye from "../pages/Employee/CreateEmploye";
import UpdateEmploye from "../pages/Employee/UpdateEmploye";

const authProtectedRoutes = [
  // Tables
  { path: "/basic-tables", component: <BasicTables /> },
  { path: "/datatable-table", component: <DatatableTables /> },
  { path: "/responsive-table", component: <ResponsiveTables /> },

  // Ui
  { path: "/ui-alerts", component: <UiAlert /> },
  { path: "/ui-buttons", component: <UiButtons /> },
  { path: "/ui-cards", component: <UiCards /> },
  { path: "/ui-carousel", component: <UiCarousel /> },
  { path: "/ui-dropdowns", component: <UiDropdown /> },
  { path: "/ui-general", component: <UiGeneral /> },
  { path: "/ui-grid", component: <UiGrid /> },
  { path: "/ui-images", component: <UiImages /> },
  { path: "/ui-lightbox", component: <UiLightbox /> },
  { path: "/ui-modals", component: <UiModal /> },
  // {path: "/ui-offcanvas", component: <UiDrawer/>},
  { path: "/ui-progressbars", component: <UiProgressbar /> },
  { path: "/ui-tabs-accordions", component: <UiTabsAccordions /> },
  { path: "/ui-typography", component: <UiTypography /> },
  { path: "/ui-video", component: <UiVideo /> },
  { path: "/ui-session-timeout", component: <UiSessionTimeout /> },
  { path: "/ui-rating", component: <UiRating /> },
  { path: "/ui-rangeslider", component: <UiRangeSlider /> },
  { path: "/ui-notifications", component: <UiNotifications /> },
  { path: "/ui-roundslider", component: <UIRoundSlider /> },

  // Forms
  { path: "/form-elements", component: <FormElements /> },
  { path: "/form-advanced", component: <FormAdvanced /> },
  { path: "/form-editors", component: <FormEditors /> },
  { path: "/form-mask", component: <FormMask /> },
  { path: "/form-file-upload", component: <FormUpload /> },
  { path: "/form-wizard", component: <FormWizard /> },
  { path: "/form-validation", component: <FormValidations /> },

  //Utility
  { path: "/starter", component: <StarterPage /> },
  { path: "/timeline", component: <Timeline /> },
  { path: "/faqs", component: <FAQs /> },
  { path: "/pricing", component: <Pricing /> },

  //Icons
  { path: "/icons-remix", component: <RemixIcons /> },
  { path: "/material-design", component: <MaterialDesign /> },
  { path: "/dripicons", component: <DripiIcons /> },
  { path: "/font-awesome-5", component: <FontAwesome /> },

  // Maps
  { path: "/google-maps", component: <MapsGoogle /> },
  { path: "/vector-maps", component: <MapsVector /> },

  //Charts
  { path: "/apex-charts", component: <ChartApex /> },
  { path: "/chartjs", component: <ChartjsChart /> },
  { path: "/charts-sparkline", component: <SparklineChart /> },
  { path: "/charts-knob", component: <ChartsKnob /> },

  //Email
  { path: "/email-inbox", component: <EmailInbox /> },
  { path: "/email-read", component: <EmailRead /> },

  //Ecommerce

  { path: "/ecommerce-products", component: <EcommerceProducts /> },
  {
    path: "/ecommerce-product-detail/:id",
    component: <EcommerceProductDetail />,
  },
  { path: "/ecommerce-orders", component: <EcommerceOrders /> },
  { path: "/ecommerce-customers", component: <EcommerceCustomers /> },
  { path: "/ecommerce-cart", component: <EcommerceCart /> },
  { path: "/ecommerce-checkout", component: <EcommerceCheckout /> },
  { path: "/ecommerce-shops", component: <EcommerceShops /> },
  { path: "/ecommerce-add-product", component: <EcommerceAddProduct /> },

  //chat
  { path: "/chat", component: <Chat /> },

  //calendar
  { path: "/calendar", component: <Calendar /> },

  { path: "/dashboard", component: <Dashboard /> },

  // this route should be at the end of all other routes
  { path: "/", exact: true, component: <Navigate to="/login" /> },

  //Role Master

  { path: "/professional-list", component: <Professionallist /> },
  { path: "/add-professional", component: <AddProfessional /> },
  { path: "/update-professional/:id", component: <UpdateProfessional /> },
  { path: "/language-master", component: <LanguageList /> },
  { path: "/triviaTypes-master", component: <TriviaTypesList /> },
  { path: "/celebrity-list", component: <CelebratyList /> },
  { path: "/add-celebrity", component: <AddCelebraty /> },
  { path: "/update-celebrity/:id", component: <UpdateCelebraty /> },
  { path: "/sectiontemplate-list", component: <SectionTemplateList /> },



  { path: "/add-movie/:id", component: <AddSection /> },
  { path: "/list-movie/:id", component: <ListMoviev /> },
  { path: "/update-movie/:id", component: <UpdateMoviev /> },


  { path: "/timeline-list/:id", component: <Timelinelist /> },
  { path: "/add-timeline/:id", component: <AddTimeline /> },
  { path: "/update-timeline/:id", component: <UpdateTimeline /> },

  { path: "/customoption-list/:id", component: <CustomOptionlist /> },
  { path: "/add-customoption/:id", component: <AddCustomOption /> },
  { path: "/update-customoption/:id", component: <UpdateCustomOption /> },

  { path: "/triviaentries-list/:id", component: <TriviaentriesList /> },
  { path: "/add-triviaentries/:id", component: <CreateTriviaentries /> },
  { path: "/update-triviaentries/:id", component: <UpdateTriviaentries /> },

  { path: "/add-series/:id", component: <AddSeries /> },
  { path: "/list-series/:id", component: <ListSeries /> },
  { path: "/update-series/:id", component: <UpdateSeries /> },


    { path: "/add-election/:id", component: <AddElection /> },
  { path: "/list-election/:id", component: <ListElection /> },
  { path: "/update-election/:id", component: <UpdateElection /> },

    { path: "/add-positions/:id", component: <AddPositions /> },
  { path: "/list-positions/:id", component: <ListPositions /> },
  { path: "/update-positions/:id", component: <UpdatePositions /> },

  { path: "/sociallink-list", component: <SocialLinkList /> },

  { path: "/genremaster-list", component: <GenreMasterList /> },



{ path: "/section-template-view/:celebId/:id", component: <Template /> },

{ path: "/section-template-list/:celebId/:id", component: <TemplateList /> },
{ path: "/section-template-edit/:celebId/:sectionId/:dataId", component: <TemplateEdit /> },

  //Role Master
  { path: "/role-master", component: <RoleMasterList /> },
  { path: "/privileges/:id", component: <Privileges /> },

  //employee-list
  { path: "/employee-list", component: <EmployeeList /> },
  { path: "/create-employee", component: <CreateEmploye /> },
  { path: "/update-employee/:id", component: <UpdateEmploye /> },

   { path: "/sectionmaster-list", component: <SectionMasterList /> },
  { path: "/add-sectionmaster", component: <AddSectionMaster /> },
  { path: "/update-sectionmaster/:id", component: <UpdateSectionMaster /> },
  //employee-list
  { path: "/triviaentries-list", component: <TriviaentriesList /> },
  { path: "/add-triviaentries", component: <CreateTriviaentries /> },
  { path: "/update-triviaentries/:id", component: <UpdateTriviaentries /> },

  //Client list

  // Project
  { path: "/testimonial-list", component: <Testimonialslist /> },
  { path: "/add-testimonial", component: <AddTestimonials /> },
  { path: "/update-testimonial/:id", component: <UpdateTestimonials /> },

  //Profile
  { path: "/user-profile", component: <Profile /> },
];

const publicRoutes = [
  // { path: "/logout", component: <Logout /> },
  { path: "/login", component: <Login /> },
  { path: "/forgot-password", component: <ForgetPwd /> },
  { path: "/register", component: <Register /> },
  { path: "/lock-screen", component: <AuthLockScreen /> },
  { path: "/verify-otp", component: <Otp /> },
  { path: "/forgot-otp", component: <ForgotOtp /> },
  { path: "/reset-password", component: <ResetPwd /> },

  // Authentication Inner
  { path: "/auth-login", component: <Login1 /> },
  { path: "/auth-register", component: <Register1 /> },
  { path: "/auth-recoverpw", component: <ForgetPwd1 /> },

  { path: "/maintenance", component: <Maintenance /> },
  { path: "/comingsoon", component: <CommingSoon /> },
  { path: "/404", component: <Error404 /> },
  { path: "/500", component: <Error500 /> },
];

export { authProtectedRoutes, publicRoutes };
