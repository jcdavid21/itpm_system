import './App.css';
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './components/Home';
import About from './components/About';
import Login from './components/Login';
import Forms from './components/Forms';
import PendingForms from './components/PendingForms';
import Faqs from './components/Faqs';
import Profile from './components/Profile';
import ResetPass from './components/ResetPass';
import ContactUs from './components/ContactUs';
import Testimonials from './components/Testimonials';
import Dashboard from './components/admin/Dashboard';
import AccountList from './components/admin/AccountList';
import CreateAccount from './components/admin/CreateAccount';
import ReportList from './components/admin/ReportList';
import Config from './components/admin/Config';
import TrailLogs from './components/admin/TrailLogs';
import DashboardRegistrar from './components/registrar/DashboardRegistrar';
import Announcements from './components/registrar/Announcements';
import Appointment from './components/Appointment';
import ReportCompleted from './components/admin/RerportCompleted';
import ReportCancelled from './components/admin/ReportCancelled';
import ContactList from './components/admin/ContactList';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/about' element={<About />}/>
          <Route path="/" element={<Home />}/>
          <Route path="/login" element={<Login />} />
          <Route path="/forms" element={<Forms />} />
          <Route path="/table/:tableId" element={<PendingForms />} />
          <Route path="/help" element={<Faqs />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/resetPass" element={<ResetPass />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/accountlist" element={<AccountList />} />
          <Route path="/createaccount" element={<CreateAccount />} />
          <Route path="/reportlist" element={<ReportList />} />
          <Route path="/config" element={<Config />} />
          <Route path="/trailogs" element={<TrailLogs />} />
          <Route path="/dashboardreg" element={<DashboardRegistrar />} />
          <Route path="/announcements" element={<Announcements />} />
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/reporthistory" element={<ReportCompleted />} />
          <Route path="/declinedReport" element={<ReportCancelled />} />
          <Route path="/contactlist" element={<ContactList />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
