import axios from 'axios';

const PATIENT_BASE_URL = 'http://localhost:8070/api/patient';
const DOCTOR_BASE_URL = 'http://localhost:8070/api/doctor';
const OPTIONS_BASE_URL = 'http://localhost:8070/api/options/';
const APPOINTMENT_BASE_URL = 'http://localhost:8070/api/appointment';
const BASE_URL = 'http://localhost:8070/api';

// GET request URLs 
// const PATIENT_INFO_API_URL = `${BASE_URL}/patient/id`;
// const DOCTOR_INFO_API_URL = `${BASE_URL}/doctor/id`;
const FIND_DOCTOR_API_URL = `${DOCTOR_BASE_URL}/getdoctorsbycityandspeciality`;
// const DOCTOR_CONSULTATIONS_API_URL = `${BASE_URL}/consultations/doctor`;
// const PATIENT_CONSULTATIONS_API_URL = `${BASE_URL}/consultations/patient`;

//POST request URLs
const LOGIN_API_URL = `${BASE_URL}/login`;
// const CONSULTATION_FORM_API_URL = `${BASE_URL}/consultations/form`;
const PATIENT_REGISTRATION_API_URL = `${PATIENT_BASE_URL}/register`;
const DOCTOR_REGISTRATION_API_URL = `${DOCTOR_BASE_URL}/register`;

class ApiService {
    // patientInfo(patient_id) {
    //     return axios.get(`${PATIENT_INFO_API_URL}/${patient_id}`);
    // }

    // doctorInfo(doctor_id) {
    //     return axios.get(`${DOCTOR_INFO_API_URL}/${doctor_id}`);
    // }

    findDoctor(searchDTO) {
        return axios.post(FIND_DOCTOR_API_URL, searchDTO);
    }

    // doctorConsultations(doctor_id) {
    //     return axios.get(`${DOCTOR_CONSULTATIONS_API_URL}/${doctor_id}`);
    // }

    // patientConsultations(patient_id) {
    //     return axios.get(`${PATIENT_CONSULTATIONS_API_URL}/${patient_id}`);
    // }

    authenticateUser(loggedUserDTO) {
        return axios.post(LOGIN_API_URL, loggedUserDTO);
    }

    // giveConsultation(data) {
    //     return axios.post(CONSULTATION_FORM_API_URL, data); 
    // }

    registerPatient(patientDTO) {
        return axios.post(PATIENT_REGISTRATION_API_URL, patientDTO);
    }

    registerDoctor(doctorDTO) {
        return axios.post(DOCTOR_REGISTRATION_API_URL, doctorDTO);
    }

    getOptions(type) {
        return axios.get(`${OPTIONS_BASE_URL} + ${type}`);
    }

    getDoctorInlineAppointments(doctorId) {
        return axios.get(DOCTOR_BASE_URL + "/myappointmentlist?doctorId=" + doctorId);
    }

    getDoctorConsultationHistory(doctorId) {
        return axios.get(DOCTOR_BASE_URL + "/myappointmentlist?doctorId=" + doctorId);
    }

    getPatientConsultationHistory(patientId) {
        return axios.get(PATIENT_BASE_URL + "/myappointmentlist?patientId=" + patientId);
    }

    requestAppointment(appDTO) {
        return axios.post(APPOINTMENT_BASE_URL + "/requestappointment", appDTO);
    }

    actionizeAppointmentRequest(appointmentId, action, slot, remarks){
        return axios.post(DOCTOR_BASE_URL + "/appointmentrequest?appointmentId="  + appointmentId + "&action=" + action + "&slot=" + slot + "&remarks=" + remarks);
    }

    getAvailableSlots(doctorId, requestedDate) {
        return axios.get(APPOINTMENT_BASE_URL + "/availableslots?doctorId=" + doctorId + "&requestedDate=" + requestedDate);
    }

    consult(consultationDTO){
        return axios.post(DOCTOR_BASE_URL + "/consult", consultationDTO);
    }

    updateDoctor(doctorDTO){
        return axios.put(DOCTOR_BASE_URL + "/update" , doctorDTO);
    }

    updatePatient(patientDTO){
        return axios.put(PATIENT_BASE_URL + "/update" , patientDTO);
    }
}

export default new ApiService();