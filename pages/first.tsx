import React, { useEffect } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { xRequest } from "../utils/request";
import getConfig from "next/config";
import { Backdrop, CircularProgress, InputLabel, MenuItem, Select } from "@mui/material";
import Generate from "./qr";

const { publicRuntimeConfig } = getConfig();

function RegisterLayout({setShowQr, setEnrollResponse, handleOpen}) {
  const [member, setMember] = React.useState("กรุณาเลือก");
  const [subjects, setSubjects] = React.useState({ ID: String });
  useEffect(() => {
    xRequest.get("/class/subjects", {}).then((response) => {
      setSubjects(response.data.resData);
    });
  }, []);

  const handleChange = (event) => {
    setMember(event.target.value);
  };
  async function submitDataForRegister() {
    handleOpen(true)
    const title = (document.querySelector("#title") as HTMLInputElement).value;
    const firstlastname = (document.querySelector("#firstlastname") as HTMLInputElement).value;
    const email = (document.querySelector("#email") as HTMLInputElement).value;

    event.preventDefault();
    let body = {
      title: title,
      firstlastname: firstlastname,
      email: email,
      member: member,
      classroomid: subjects.ID,
    };

    xRequest
      .post("/register/enroll", {
        data: body,
      })
      .then((response) => {
        console.log(response.data)
        setEnrollResponse(response.data);

        setShowQr(true)
        handleOpen(false)
          // router.push("/qr");
          // return <Generate />
      });

    return false;
  }

  return (
    <div className="md:flex md:flex-col2 sm:flex-col1 justify-center items-center w-screen h-screen">
      <section
        id="leftComponent"
        className="grid justify-center items-center md:w-2/4 md:h-2/4"
      >
        <h1 className="bg-imgtop bg-contain bg-no-repeat h-imgtop w-imgtop mx-auto"></h1>
      </section>
      <section id="rightComponent" className="justify-center items-center ">
        <div className="flex flex-col items-center justify-center ">
          <div className="w-full rounded-lg  md:mt-0 sm:max-w-md xl:p-0 content-center">
            <div className="p-1 space-y-1 md:space-y-2 sm:p-8 grid justify-items-center">
              <h1 className="text-3xl font-bold leading-tight tracking-tight md:text-3xl ">
                ลงทะเบียนสัมมนา
              </h1>
              <form
                className="w-96 space-y-1 md:space-y-2"
                onSubmit={submitDataForRegister}
              >
                <div>
                <label
                    className="block mb-2 text-2xl font-medium"
                  >
                    วันเข้าร่วมสัมมนา - สังกัด 
                  </label>
                  <InputLabel
                    id="member"
                    htmlFor="member"
                    className="block mb-2 sm:text-2xl rounded-lg font-medium text-gray-1200"
                  >

                  </InputLabel>
                  <Select
                    sx={{
                      minWidth: 1,
                      backgroundColor: "#F9FAFB",
                      color: "#00004F",
                      borderRadius: "20px",
                    }}
                    labelId="member"
                    id="member"
                    value={member}
                    label="member"
                    onChange={handleChange}
                  >
                    {publicRuntimeConfig.MEMBERS.map((detail, i) => {
                      return (
                        <MenuItem key={i} value={detail}>
                          {detail}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </div>

                <div>
                  <label
                    htmlFor="title"
                    className="block mb-2 text-2xl font-medium"
                  >
                    ยศ/คำนำหน้านาม
                  </label>
                  <input
                    type="title"
                    name="title"
                    id="title"
                    className=" bg-gray-50 border border-gray-300 sm:text-2xl rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="นาย, น.ส., นาง, จ.ส.ต, ร.ท., พ.อ."
                  ></input>
                </div>

                <div>
                  <label
                    htmlFor="firstlastname"
                    className="block mb-2 text-2xl font-medium text-gray-900"
                  >
                    ชื่อ-นามสกุล
                  </label>
                  <input
                    type="firstlastname"
                    name="firstlastname"
                    id="firstlastname"
                    className=" h-16  bg-gray-50 border border-gray-300 text-gray-900 sm:text-2xl rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="คิดดี  ทำดี"
                  ></input>
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-2xl font-medium text-gray-900 content-center"
                  >
                    อีเมล
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-2xl rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                  ></input>
                </div>

                
                {/* <div>
                  <label
                    htmlFor="division"
                    className="block mb-2 text-2xl font-medium text-gray-900 "
                  >
                    กอง
                  </label>
                  <input
                    type="division"
                    name="division"
                    id="division"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-2xl rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="กองเครือข่าย"
                  ></input>
                </div>
                <div>
                  <label
                    htmlFor="department"
                    className="block mb-2 text-2xl font-medium text-gray-900 "
                  >
                    แผนก
                  </label>
                  <input
                    type="department"
                    name="department"
                    id="department"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-2xl rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="อำนวยการกอง"
                  ></input>
                </div> */}
                <button
                  type="submit"
                  className="w-full text-white bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-2xl px-5 py-2.5 text-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800"
                  
                      >
                  ลงทะเบียน
                </button>

                <div className="grid justify-items-center">
                  <h6 className="text-1xl leading-tight tracking-tight md:text-1xl justify-items-center">
                    กรุณากรอกข้อมูลให้ครบถ้วน
                  </h6>
                </div>
                <div className="grid justify-items-center">
                  <h6 className="text-1xl leading-tight tracking-tight md:text-1xl">
                    สอบถามการลงทะเบียน โทร 02-2817999 ต่อ 4058 - 4059
                  </h6>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export interface IResData {
  code: number;
  qr: string;
  resData: string;
}
export default function FirstPage() {
  const [showqr, setShowQr] = React.useState(false);
  const [enrollResponse, setEnrollResponse] = React.useState<IResData>({ code: 1, qr: "", resData: "" });

  const [open, setOpen] = React.useState(false);

  return (
    <div>
      {showqr && <Generate qrCodeValue={enrollResponse.qr} />}
      {!showqr && <RegisterLayout setShowQr={setShowQr} setEnrollResponse={setEnrollResponse} handleOpen={setOpen}/>}

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
    
  );
}
