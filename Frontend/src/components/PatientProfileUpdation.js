import React from 'react';
import { useForm } from 'react-hook-form';
import classNames from 'classnames';
import { useRef, useEffect } from 'react';
import ApiService from '../services/ApiService';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ToastContainer, toast} from 'react-toastify';

const PatientProfileUpdation = () => {

    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, watch } = useForm({ mode: "onChange" });
    const password = useRef({});
    password.current = watch("password", "");
    const [cityOptions, setCityOptions] = useState([]);
    const effectCalled = useRef(false);

    const [user, setUser] = useState(() => {
        var usr = JSON.parse(localStorage.getItem("user"));
        return usr;
    });

    useEffect(() => {
        if (!effectCalled.current) {
            ApiService.getOptions(1).then(resp => {
                console.log(resp.data);

                setCityOptions(['Select City',
                    ...resp.data
                ])
            })
            effectCalled.current = true;
        }
    }, []);

    const submitHandler = (data) => {
        console.log(JSON.stringify(data));
        var u = { ...data, patientId: user.patientId, email: user.email, patientAadharNo: user.patientAadharNo };
        ApiService.updatePatient(u)
            .then(resp => {
                console.log(resp.data);
                // navigate('/patient', { state: { message: resp.data } });
                localStorage.setItem('user', JSON.stringify(u));
                toast.info(resp.data, {
                    position: toast.POSITION.TOP_RIGHT
                  });
            }).catch(err => {
                console.log(err);
            })
    }

    return (
        <div style={{ backgroundColor: "#7FB79B" }}>
            <div class="conatiner-fluid justify-content-center px-4 m-5" >
                <div class="row justify-content-center rows gx-5">
                    <div class="col-9 justify-content-center cols shadow m-5 py-5 .fs-1" style={{ backgroundColor: "white" }}><h3><b>Update Profile</b></h3>
                        <form onSubmit={handleSubmit(submitHandler)} method="post" className="needs-validation" noValidate autoComplete="off">

                            <hr />
                            <div className="form-group">
                                <div className="row">
                                    <div className="col position-relative">
                                        <label><b>Patient Id </b></label>
                                        <input disabled type="text" className={classNames("form-control", { "is-invalid": errors.patientId })} name="patientId" defaultValue={user.patientId}
                                            {...register('patientId'
                                            )} />
                                    </div>
                                    <div className="col position-relative">
                                        <label><b>Email </b></label>
                                        <input disabled={true} type="email" className={classNames("form-control", { "is-invalid": errors.email })} name="email" defaultValue={user.email}
                                            {...register('email'
                                            )}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col position-relative">
                                    <label><b>Name </b></label>
                                    <input disabled={false} type="text" className={classNames("form-control", { "is-invalid": errors.patientName })} name="patientName" defaultValue={user.patientName}
                                        {...register('patientName', {
                                            required: "Please enter your full name.",
                                            minLength: {
                                                value: 4,
                                                message: "Should be at least 4 characters"
                                            },
                                            pattern: {
                                                value: /^(?![\. ])[a-zA-Z\. ]+(?<! )$/,
                                                message: "Invalid name."
                                            }
                                        })}
                                    />
                                    {errors.patientName && <div className="invalid-tooltip">{errors.patientName.message}</div>}
                                </div>

                            </div>
                            <div className="form-group">
                                <div className="row">
                                    <div className="col position-relative">
                                        <label><b>Password </b></label>
                                        <input disabled={false} type="password" className={classNames("form-control", { "is-invalid": errors.password })} name="password" defaultValue={user.password}
                                            {...register('password', {
                                                required: "Please enter your password.",
                                                minLength: {
                                                    value: 8,
                                                    message: "Should be at least 8 characters."
                                                }
                                            }
                                            )}
                                        />
                                        {errors.password && <div className="invalid-tooltip">{errors.password.message}</div>}
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col position-relative">
                                    <label><b>Mobile </b></label>
                                    <input type="text" className={classNames("form-control", { "is-invalid": errors.patientMobileNo })} name="patientMobileNo" defaultValue={user.patientMobileNo}
                                        {...register('patientMobileNo', {
                                            required: "Please enter your mobile.",
                                            pattern: {
                                                value: /^[789]\d{9}$/,
                                                message: "Invalid mobile number."
                                            }
                                        }
                                        )}

                                    />

                                    {errors.patientMobileNo && <div className="invalid-tooltip">{errors.patientMobileNo.message}</div>}
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col position-relative">
                                    <label><b>Aadhaar No </b></label>
                                    <input disabled={true} type="text" className={classNames("form-control", { "is-invalid": errors.patientAadharNo })} name="patientAadharNo" defaultValue={user.patientAadharNo}
                                        {...register('patientAadhar'
                                        )}
                                    />
                                    {errors.patientAadharNo && <div className="invalid-tooltip">{errors.patientAadharNo.message}</div>}
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="row">
                                    <div className="col position-relative">
                                        <label><b>Address </b></label>
                                        <input disabled={false} type="text" className={classNames("form-control", { "is-invalid": errors.patientAddress })} name="patientAddress" defaultValue={user.patientAddress}
                                            {...register('patientAddress', {
                                                required: "Please enter your address.",
                                                minLength: {
                                                    value: 10,
                                                    message: "Should be at least 10 characters."
                                                }
                                            }
                                            )}
                                        />
                                        {errors.patientAddress && <div className="invalid-tooltip">{errors.patientAddress.message}</div>}
                                    </div>
                                    <div className="col-4 position-relative">
                                        <select disabled={false} className="form-select mt-4" aria-label="Default select example" name="patientCity"
                                            {...register('patientCity', {
                                                required: "Please enter your city.",
                                            }
                                            )}>
                                            {cityOptions.map((cityOption) => {
                                                return (user.patientCity == cityOption ?
                                                    <option selected key={cityOption} value={cityOption}>
                                                        {cityOption}
                                                    </option> :
                                                    <option key={cityOption} value={cityOption}>
                                                        {cityOption}
                                                    </option>
                                                );
                                            })}
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="form-group">
                                <button type="submit" className="btn btn-outline-success btn-md text-dark m-2">Update</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>

    )
}

export default PatientProfileUpdation