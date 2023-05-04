import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { occupations, religions, bloodGroups } from "../dropDownLists";
import { useNavigate } from "react-router-dom";

const Form = () => {
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm();

  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedState, setSelectedState] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the list of states and set it to the state variable
    fetch("https://cdn-api.co-vin.in/api/v2/admin/location/states", {
      mode: "no-cors",
    })
      .then((response) => response.json())
      .then((data) => {
        setStates(data.states);
      })
      .catch((error) => console.log(error));

    fetch("https://services.onetcenter.org/ws/mnm/search?keyword=*&end=50", {
      mode: "no-cors",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    // Fetch the list of districts for the selected state and set it to the district variable
    if (selectedState !== "") {
      fetch(
        `https://cdn-api.co-vin.in/api/v2/admin/location/districts/${selectedState}`,
        { mode: "no-cors" }
      )
        .then((response) => response.json())
        .then((data) => {
          setDistricts(data.districts);
        })
        .catch((error) => console.log(error));
    }
  }, [selectedState]);

  const onSubmit = async (data, e) => {
    const isValid = await trigger();
    if (!isValid) {
      e.preventDefault();
      return;
    } else {
      try {
        
        if(data.idType === 'Aadhar' && data.id.length !== 12 && isNaN(parseInt(data.id)) ) {
          return alert('Please provide a valid Aadhar ID')
        }
        const panRegx = /^([A-Z]){5}([0-9]){4}([A-Z]){1}$/;
        if (data.idType === 'PAN' && data.id.length !== 10 && !panRegx.test(data.id)) {
          throw new Error('Please provide a valid PAN ID');
        }
        axios.post("http://localhost:8080/formData", data).then((res) => {
          alert('Successfully Registered.')
        });
      } catch (error) {
        console.log("Failed Complete the process !!!");
      }
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex">
          <div className="w-[45%] mt-3 ml-3">
            <p className="underline font-semibold">Personal Details</p>
            <span className="flex mt-4 w-full">
              <p className="w-[20%]">
                Name <span className="text-red-700">*</span>
              </p>
              <input
                className="border w-[70%] h-7 ml-4 rounded-sm pl-1"
                type="text"
                placeholder="Enter Name"
                {...register("name", {
                  required: true,
                  maxLength: 20,
                })}
              />

              {errors.name && (
                <p className="mt-1 text-red-500">
                  {errors.name.type === "required" && "This field is required."}
                  {errors.name.type === "maxLength" && "Max length is 20 char."}
                </p>
              )}
            </span>

            <span className="flex mt-4 w-full">
              <p className="w-[20%]">Mobile</p>
              <input
                className="border w-[50%] ml-4 rounded-sm pl-1"
                type="number"
                placeholder="Enter Mobile"
                {...register("mobile", {
                  pattern:
                    /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
                })}
              />
              {errors.mobile && (
                <p className="mt-1 text-red-500 ">
                  {errors.mobile.type === "pattern" && "Invalid phone number."}
                </p>
              )}
            </span>

            <p className="underline font-semibold mt-5">Contact Details</p>
            <span className="flex mt-4 w-full">
              <p className="w-[22%]">Guardian Details</p>
              <select
                className="w-[20%] rounded-sm"
                name=""
                id=""
                {...register("guardian")}
              >
                <option value="" selected="selected" hidden="hidden">
                  Choose here
                </option>
                <option value="Father">Father</option>
                <option value="Mother">Mother</option>
                <option value="Grand Father">Grand Father</option>
                <option value="Grand Mother">Grand Mother</option>
              </select>
              <input
                className="border w-[48%] ml-4 pl-1"
                type="text"
                placeholder="Enter Guardian Name"
                {...register("guardianName", {
                  maxLength: 20,
                })}
              />
              {errors.guardianName && (
                <p className="mt-1 text-red-500 ">
                  {errors.guardianName.type === "maxLength" &&
                    "Max length is 20 char."}
                </p>
              )}
            </span>
            <p className="underline font-semibold mt-5">Address Details</p>

            <span className="flex mt-4 w-full">
              <p className="w-[20%]">Address</p>

              <input
                className="border w-[70%] ml-4 rounded-sm pl-1"
                type="text"
                placeholder="Enter Address"
                {...register("address", {
                  maxLength: 100,
                })}
              />
              {errors.address && (
                <p className="mt-1 text-red-500 ">
                  {errors.address.type === "maxLength" &&
                    "Max length is 100 char."}
                </p>
              )}
            </span>
            <span className="flex w-full mt-4">
              <p className="w-[20%]">Country</p>
              <input
                className="border w-[50%] rounded-sm ml-4 pl-1"
                type="text"
                value="India"
                aria-readonly
                placeholder="Enter Country"
                {...register("country", {
                  maxLength: 20,
                })}
              />
              {errors.country && (
                <p className="mt-1 text-red-500 ">
                  {errors.country.type === "maxLength" &&
                    "Max length is 20 char."}
                </p>
              )}
            </span>
          </div>

          <div className="w-[55%] mt-3 ml-3">
            <span className="flex w-full mt-10">
              <p className="w-[18%]">
                Date of Birth or <br /> Age{" "}
                <span className="text-red-700">*</span>
              </p>

              <input
                className="border h-7 w-[40%] ml-4 rounded-sm pl-1"
                type="text"
                placeholder="DD/MM/YYYY or Age in Years"
                {...register("age", {
                  required: true,
                  maxLength: 10,
                })}
              />
              {errors.age && (
                <p className="mt-1 text-red-500 ">
                  {errors.age.type === "required" && "This field is required."}
                  {errors.age.type === "maxLength" && "Max length is 10 char."}
                </p>
              )}

              <p className="w-[8%] ml-8">
                Sex <span className="text-red-700">*</span>
              </p>

              <select
                className="w-[20%] h-7 rounded-sm"
                name=""
                id=""
                {...register("sex",{
                  required: true,
                  
                })}
              >
                <option value="" selected="selected" hidden="hidden">
                  Choose here
                </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              {errors.age && (
                <p className="mt-1 text-red-500 ">
                  {errors.age.type === "required" && "This field is required."}                 
                </p>
              )}
            </span>
            <span className="flex mt-4 w-full">
              <p className="w-[18%]">Govt Issued Id</p>
              <select
                className="ml-4 w-[30%] rounded-sm"
                name=""
                id=""
                {...register("idType")}
              >
                <option value="" selected="selected" hidden="hidden">
                  Choose here
                </option>
                <option value="Aadhar">Aadhar</option>
                <option value="PAN">PAN</option>
              </select>

              <input
                className="border ml-4 rounded-sm w-[40%] pl-1"
                type="text"
                placeholder="Enter Govt ID"
                {...register("id", {
                  maxLength: 12,
                })}
              />
              {errors.id && (
                <p className="mt-1 text-red-500 ">
                  {errors.id.type === "maxLength" && "Max length is 12 char."}
                </p>
              )}
            </span>
            <span className="flex mt-8 w-full">
              <p className="w-[10%]">Email</p>
              <input
                className="border h-7 pl-1"
                type="text"
                placeholder="Enter Email"
                {...register("email", {
                  pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                })}
              />
              {errors.email && (
                <p className="mt-1 text-red-500 ">
                  {errors.email.type === "pattern" && "Invalid Email address"}
                </p>
              )}
              <p className="ml-8 w-[22%]">Emergency Contact Number</p>
              <input
                className="border w-[22%] rounded-sm h-7 pl-1"
                type="text"
                placeholder="Enter Emergency No"
                {...register("emergency", {
                  pattern:
                    /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
                })}
              />
              {errors.emergency && (
                <p className="mt-1 text-red-500 ">
                  {errors.emergency.type === "pattern" &&
                    "Invalid Phone Number"}
                </p>
              )}
            </span>
            <span className="flex mt-8 w-full">
              <p className="w-[5%]">State</p>
              <select
                className="w-[35%] ml-3 rounded-sm"
                name=""
                id=""
                {...register("state")}
                onChange={(e) => setSelectedState(e.target.value)}
              >
                <option value="" selected="selected" hidden="hidden">
                  Choose here
                </option>
                {states.map((state) => (
                  <option key={state.state_id} value={state.state_id}>
                    {state.state_name}
                  </option>
                ))}
              </select>

              <p className="w-[5%] ml-4">City</p>
              <select
                className="w-[35%] rounded-sm ml-3"
                name=""
                id=""
                {...register("city")}
              >
                <option value="" selected="selected" hidden="hidden">
                  Choose here
                </option>
                {districts.map((district) => (
                  <option
                    key={district.district_id}
                    value={district.district_id}
                  >
                    {district.district_name}
                  </option>
                ))}
              </select>
            </span>
            <span className="flex mt-2">
              <p className="w-[10%]">Pincode</p>

              <input
                className="border w-[30%] rounded-sm pl-1"
                type="text"
                placeholder="Enter Pincode"
                {...register("pincode", {
                  maxLength: 20,
                })}
              />
              {errors.pincode && (
                <p className="mt-1 text-red-500 ">
                  {errors.pincode.type === "maxLength" &&
                    "Max length is 20 char."}
                </p>
              )}
            </span>
          </div>
        </div>

        <div className="w-[95%] ml-3 mt-3">
          <p className="underline font-semibold">Other Details</p>
          <span className="flex w-full mt-3">
            <p className="w-[8%]">Occupation</p>

            <select
              className="w-[15%] rounded-sm ml-3"
              name=""
              id=""
              {...register("occupation")}
            >
              <option value="" selected="selected" hidden="hidden">
                Choose here
              </option>
              {occupations.map((occupation) => (
                <option key={occupation.title} value={occupation.title}>
                  {occupation.title}
                </option>
              ))}
            </select>

            <p className="ml-8 w-[6%]">Religion</p>

            <select
              className="w-[15%] rounded-sm ml-3"
              name=""
              id=""
              {...register("religion")}
            >
              <option value="" selected="selected" hidden="hidden">
                Choose here
              </option>
              {religions.map((religion) => (
                <option key={religion.name} value={religion.name}>
                  {religion.name}
                </option>
              ))}
            </select>

            <p className="ml-8 w-[9%] ">Martial Status</p>

            <select
              className="w-[15%] rounded-sm ml-3"
              name=""
              id=""
              {...register("occupation")}
            >
              <option value="" selected="selected" hidden="hidden">
                Choose here
              </option>
              <option value="Single">Single</option>
              <option value="Married">Married</option>
              <option value="Divorced">Divorced</option>
              <option value="Widowed">Widowed</option>
              <option value="Seperated">Seperated</option>
            </select>

            <p className="ml-8 w-[8%]">Blood Group</p>

            <select
              className="w-[15%] rounded-sm ml-3"
              name=""
              id=""
              {...register("bloodGroup")}
            >
              <option value="" selected="selected" hidden="hidden">
                Choose here
              </option>
              {bloodGroups.map((bloodGroup) => (
                <option key={bloodGroup.name} value={bloodGroup.name}>
                  {bloodGroup.name}
                </option>
              ))}
            </select>
          </span>
          <span className="w-full mt-3 flex">
            <p className="w-[8%]">Nationality</p>
            <input
              className="border w-[15%] rounded-sm pl-1"
              type="text"
              value="India"
              area-readOnly
              placeholder="Enter Nationality"
              {...register("nationality", {
                
                maxLength: 20,
              })}
            />
            {errors.nationality && (
              <p className="mt-1 text-red-500 ">
                {errors.nationality.type === "maxLength" &&
                  "Max length is 20 char."}
              </p>
            )}
          </span>
          <span className="flex justify-end mr-2 mt-8">
            <button className="px-3 py-2 mr-10 rounded-md border text-red-500 border-red-500" onClick={() => navigate('/')} >
              CANCEL
            </button>
            <button
              className="px-3 py-2 rounded-md bg-green-600 text-white"
              type="submit"
            >
              SUBMIT
            </button>
          </span>
        </div>
      </form>
    </div>
  );
};

export default Form;
