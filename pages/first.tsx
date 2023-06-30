import React, { useEffect } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { xRequest } from "../utils/request";
import getConfig from "next/config";
import { InputLabel, MenuItem, Select } from "@mui/material";
const { publicRuntimeConfig } = getConfig();

export interface IResData {
  code: number;
  resData: string;
}
export default function FirstPage() {
  const [open, setOpen] = React.useState(false);
  const [msg, setMsg] = React.useState<IResData>({ code: 1, resData: "" });
  const [member, setMember] = React.useState("กรุณาเลือก");
  const [subjects, setSubjects] = React.useState([{
    ID: String,
  }]);

  useEffect(() => {
    xRequest.get("/class/subjects", {}).then((response) => {
      setSubjects(response.data.resData);
    });
  }, []);

  const handleChange = (event) => {
    setMember(event.target.value);
  };
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function submitDataForRegister() {
    const title = (document.querySelector("#title") as HTMLInputElement).value;
    const firstlastname = (
      document.querySelector("#firstlastname") as HTMLInputElement
    ).value;

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
        setMsg(response.data);
        setOpen(true);
      });

    return false;
  }

  return (
    <div className="md:flex md:flex-col2 sm:flex-col1 justify-center items-center w-screen h-screen">
      <section
        id="leftComponent"
        className="grid justify-center items-center md:w-2/4 md:h-2/4"
      >
        <h1 className="bg-imgtop bg-contain bg-no-repeat h-imgtop w-imgtop "></h1>
        <h1 className="bg-imgbuttom bg-contain bg-no-repeat h-imgbuttom w-imgbuttom"></h1>
      </section>
      <section id="rightComponent" className="justify-center items-center ">
        <div className="flex flex-col items-center justify-center ">
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-description" sx={{ mt: 1 }}>
                {msg.resData}
              </Typography>
            </Box>
          </Modal>
          <div className="w-full rounded-lg  md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-1 space-y-1 md:space-y-2 sm:p-8">
              <h1 className="text-2xl font-bold leading-tight tracking-tight md:text-2xl ">
                ลงทะเบียนเรียน
              </h1>
              <form
                className="w-96 space-y-1 md:space-y-2"
                onSubmit={submitDataForRegister}
              >
                <div>
                  <label
                    htmlFor="title"
                    className="block mb-2 text-2xl font-medium"
                  >
                    คำนำหน้า
                  </label>
                  <input
                    type="title"
                    name="title"
                    id="title"
                    className=" bg-gray-50 border border-gray-300 sm:text-2xl rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="นาย"
                  ></input>
                </div>

                <div>
                  <label
                    htmlFor="firstlastname"
                    className="block mb-2 text-2xl font-medium text-gray-900 "
                  >
                    ชื่อ-นามสกุล
                  </label>
                  <input
                    type="firstlastname"
                    name="firstlastname"
                    id="firstlastname"
                    className=" h-16  bg-gray-50 border border-gray-300 text-gray-900 sm:text-2xl rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="ชื่อ"
                  ></input>
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-2xl font-medium text-gray-900 "
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

                <div>
                  <InputLabel
                    id="member"
                    htmlFor="member"
                    className="block mb-2 sm:text-2xl rounded-lg font-medium text-gray-1200 "
                  >
                    สังกัด
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
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
