import { useEffect, useState } from "react"
import { Stepper, Button, Group } from "@mantine/core"

export default function Tutorial({ user }) {
  const [active, setActive] = useState(0)
  useEffect(() => {
    setActive(0)
  } , [user])
  const nextStep = () => setActive((current) => (current < 7 ? current + 1 : current))
  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current))

  return (
    <>
      {user === "user" ? (
        <Group position="center">
          <Stepper active={active} onStepClick={setActive} breakpoint="sm" size="lg" m="md">
            <Stepper.Step label="Create Your Account" allowStepSelect={active > 0} m="md">
              <div className="flex items-center justify-center">
                <article className="block md:max-w-3xl p-6 text-center shadow-xl bg-gray-50 rounded-xl">
                  <h5 className="text-3xl lg:text-4xl font-bold text-blue-600">Account Creation</h5>

                  <h6 className="mt-1 text-sm text-gray-900">
                    To create your account, you need to fill out the form below.
                  </h6>
                  <ul className="mt-8 space-y-2.5 text-gray-900">
                    <li>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="inline w-6 h-6 text-blue-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      You will be asked to provide your email address and a password.
                    </li>

                    <li>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="inline w-6 h-6 text-blue-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      You can also use your Google Account to create your account.
                    </li>
                  </ul>
                </article>
              </div>
            </Stepper.Step>
            <Stepper.Step label="View Templates" allowStepSelect={active > 1}>
              <div className="flex items-center justify-center">
                <article className="block md:max-w-3xl p-6 text-center shadow-xl bg-gray-50 rounded-xl">
                  <h5 className="text-3xl lg:text-4xl font-bold text-blue-600">Templates</h5>

                  <h6 className="mt-1 text-sm text-gray-900">
                  To view the templates, you need to login to your account.
                  </h6>
                  <ul className="mt-8 space-y-2.5 text-gray-900">
                    <li>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="inline w-6 h-6 text-blue-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      You can use the search function to find the templates you want.
                    </li>

                    <li>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="inline w-6 h-6 text-blue-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      You can also use the categories to filter the templates.
                    </li>
                  </ul>
                </article>
              </div>
            </Stepper.Step>
            <Stepper.Step label="Select Template" allowStepSelect={active > 2}>
              {/* <div className="w-full flex items-center justify-center">
                <div className=" prose md:prose-lg p-5">
                  <h3 className="w-full ">Template View</h3>
                  <ul>
                    <li>
                      Until the Payment is complete, you can only view a placeholder of the
                      template.
                    </li>
                    <li>
                      {" "}
                      You can use the form to fill the template with the information you want.
                    </li>
                  </ul>
                </div>
              </div> */}
              <div className="flex items-center justify-center">
                <article className="block md:max-w-3xl p-6 text-center shadow-xl bg-gray-50 rounded-xl">
                  <h5 className="text-3xl lg:text-4xl font-bold text-blue-600">Template View</h5>

                  <h6 className="mt-1 text-sm text-gray-900">
                    Here is the place to view and fill your templates
                  </h6>
                  <ul className="mt-8 space-y-2.5 text-gray-900">
                    <li>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="inline w-6 h-6 text-blue-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      Until the Payment is complete, you can only view a placeholder of the
                      template.
                    </li>

                    <li>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="inline w-6 h-6 text-blue-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      You can use the form to fill the template with the information you want.
                    </li>
                  </ul>
                </article>
              </div>
            </Stepper.Step>
            <Stepper.Step label="Enter Details" allowStepSelect={active > 3}>
              {/* <div className="w-full flex items-center justify-center">
                <div className=" prose md:prose-lg p-5">
                  <h3 className="w-full ">Template Details</h3>
                  <ul>
                    <li>
                      {" "}
                      Once you have filled the form, you can click on the "Submit" button to save
                      the template.
                    </li>
                    <li> You can view the changes in the preview section.</li>
                  </ul>
                </div>
              </div> */}
              <div className="flex items-center justify-center">
                <article className="block md:max-w-3xl p-6 text-center shadow-xl bg-gray-50 rounded-xl">
                  <h5 className="text-3xl lg:text-4xl font-bold text-blue-600">Template</h5>

                  <h6 className="mt-1 text-sm text-gray-900">
                  Template Details
                  </h6>
                  <ul className="mt-8 space-y-2.5 text-gray-900">
                    <li>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="inline w-6 h-6 text-blue-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      Once you have filled the form, you can click on the "Submit" button to save
                      the template.
                    </li>

                    <li>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="inline w-6 h-6 text-blue-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      You can view the changes in the preview section.
                    </li>
                  </ul>
                </article>
              </div>
            </Stepper.Step>
            <Stepper.Step label="Complete Payment" allowStepSelect={active > 4}>
              <div className="flex items-center justify-center">
                <article className="block md:max-w-3xl p-6 text-center shadow-xl bg-gray-50 rounded-xl">
                  <h5 className="text-3xl lg:text-4xl font-bold text-blue-600">Template Payment and Download PDF</h5>

                  <h6 className="mt-1 text-sm text-gray-900">
                  You can pay using the Razorpay Payment Gateway.
                  </h6>
                  <ul className="mt-8 space-y-2.5 text-gray-900">
                    <li>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="inline w-6 h-6 text-blue-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      Once the payment is complete, you will be able to download the template.
                    </li>

                    <li>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="inline w-6 h-6 text-blue-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      You can download the PDF Now
                    </li>
                  </ul>
                </article>
              </div>
            </Stepper.Step>
            <Stepper.Completed>
              {/* <div className="w-full flex items-center justify-center">
                <div className=" prose md:prose-lg p-5">
                  <h2 className="w-full  text-center">✅ You have completed the tutorial.</h2>
                </div>
              </div> */}
              <div className="flex items-center justify-center">
                <article className="block md:max-w-3xl p-6 text-center shadow-xl bg-gray-50 rounded-xl">
                  <h5 className="text-3xl lg:text-4xl font-bold text-blue-600">You have completed the tutorial</h5>

                  <h6 className="mt-1 text-4xl text-gray-900">
                    ✅
                  </h6>
                </article>
              </div>
            </Stepper.Completed>
          </Stepper>
        </Group>
      ) : (
        <Group position="center">
          <Stepper active={active} onStepClick={setActive} breakpoint="sm" size="lg" m="md">
            <Stepper.Step label="Create Your Account" allowStepSelect={active > 0} m="md">
            <div className="flex items-center justify-center">
                <article className="block md:max-w-3xl p-6 text-center shadow-xl bg-gray-50 rounded-xl">
                  <h5 className="text-3xl lg:text-4xl font-bold text-blue-600">Account Creation</h5>

                  <h6 className="mt-1 text-sm text-gray-900">
                    To create your account, you need to fill out the form below.
                  </h6>
                  <ul className="mt-8 space-y-2.5 text-gray-900">
                    <li>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="inline w-6 h-6 text-blue-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      You will be asked to provide your email address and a password.
                    </li>

                    <li>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="inline w-6 h-6 text-blue-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      You can also use your Google Account to create your account.
                    </li>
                  </ul>
                </article>
              </div>
            </Stepper.Step>
            <Stepper.Step label="View Templates" allowStepSelect={active > 1}>
              <div className="flex items-center justify-center">
                <article className="block md:max-w-3xl p-6 text-center shadow-xl bg-gray-50 rounded-xl">
                  <h5 className="text-3xl lg:text-4xl font-bold text-blue-600">Templates</h5>

                  <h6 className="mt-1 text-sm text-gray-900">
                  To view the templates, you need to login to your account.
                  </h6>
                  <ul className="mt-8 space-y-2.5 text-gray-900">
                    <li>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="inline w-6 h-6 text-blue-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      You can use the search function to find the templates you want.
                    </li>

                    <li>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="inline w-6 h-6 text-blue-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      You can also use the categories to filter the templates.
                    </li>
                  </ul>
                </article>
              </div>
            </Stepper.Step>
            <Stepper.Step label="Pay Subscription" allowStepSelect={active > 2}>
              <div className="flex items-center justify-center">
                <article className="block md:max-w-3xl p-6 text-center shadow-xl bg-gray-50 rounded-xl">
                  <h5 className="text-3xl lg:text-4xl font-bold text-blue-600">Subscription Payment</h5>

                  <h6 className="mt-1 text-sm text-gray-900">
                  You can pay using the{" "}
                      <span className="font-bold">Razorpay Payment Gateway.</span>
                  </h6>
                  <ul className="mt-8 space-y-2.5 text-gray-900">
                    <li>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="inline w-6 h-6 text-blue-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      The Subscription will be handled by Razorpay
                    </li>

                    <li>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="inline w-6 h-6 text-blue-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      Once the payment is complete, you will be able to view the full version of the
                      templates and download all the templates.
                    </li>
                  </ul>
                </article>
              </div>
            </Stepper.Step>
            <Stepper.Step label="Select Template" allowStepSelect={active > 2}>
              <div className="flex items-center justify-center">
                <article className="block md:max-w-3xl p-6 text-center shadow-xl bg-gray-50 rounded-xl">
                  <h5 className="text-3xl lg:text-4xl font-bold text-blue-600">Template View</h5>

                  <h6 className="mt-1 text-sm text-gray-900">
                  Detail View of the Template with form
                  </h6>
                  <ul className="mt-8 space-y-2.5 text-gray-900">
                    <li>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="inline w-6 h-6 text-blue-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      Until the Payment is complete, you can only view a placeholder of the
                      template.
                    </li>

                    <li>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="inline w-6 h-6 text-blue-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      You can use the form to fill the template with the information you want.
                    </li>
                  </ul>
                </article>
              </div>
            </Stepper.Step>
            <Stepper.Step label="Enter Details" allowStepSelect={active > 3}>
              <div className="flex items-center justify-center">
                <article className="block md:max-w-3xl p-6 text-center shadow-xl bg-gray-50 rounded-xl">
                  <h5 className="text-3xl lg:text-4xl font-bold text-blue-600">Document Details</h5>
                  <ul className="mt-8 space-y-2.5 text-gray-900">
                    <li>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="inline w-6 h-6 text-blue-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      Once you have filled the form, you can click on the "Submit" button to save
                      the document.
                    </li>

                    <li>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="inline w-6 h-6 text-blue-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      You can view the changes in the preview section.
                    </li>
                    <li>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="inline w-6 h-6 text-blue-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      You can now download the Document
                    </li>
                  </ul>
                </article>
              </div>
            </Stepper.Step>
            <Stepper.Completed>
              {/* <div className="w-full flex items-center justify-center">
                <div className=" prose md:prose-lg p-5">
                  <h2 className="w-full  text-center">✅ You have completed the tutorial.</h2>
                </div>
              </div> */}
              <div className="flex items-center justify-center">
                <article className="block md:max-w-3xl p-6 text-center shadow-xl bg-gray-50 rounded-xl">
                  <h5 className="text-3xl lg:text-4xl font-bold text-blue-600">You have completed the tutorial</h5>

                  <h6 className="mt-1 text-4xl text-gray-900">
                    ✅
                  </h6>
                </article>
              </div>
            </Stepper.Completed>
          </Stepper>
        </Group>
      )}
      <Group position="center" m="xl">
        <Button variant="default" onClick={prevStep} radius="xl">
          Back
        </Button>
        <Button radius="xl" color="indigo" onClick={nextStep}>
          Next step
        </Button>
      </Group>
    </>
  )
}
