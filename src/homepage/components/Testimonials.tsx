import { Avatar } from "@mantine/core"
export default function Testimonials() {
  return (
    <section className="relative pt-24 pb-32 overflow-hidden">
      <div className="container sm:mx-auto sm:px-4">
        <h1 className="text-center sm:text-6xl font-bold text-3xl mb-4 p-5 text-[#FFE69A]">Testimonials</h1>
        <h2 className="mb-5 max-w-2xl mx-auto font-heading font-bold text-center text-xl sm:text-3xl text-[#FFD24C]">
          12k+ Happy Clients
        </h2>
        <p className="mb-16 text-base max-w-md mx-auto text-center text-white">
          Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia
          consequat duis enim velit mollit.
        </p>
        <div className="flex flex-wrap -m-5 md:p-10">
          <div className="w-full md:w-1/3 p-5 ">
            <div className="h-full p-0.5 shadow-2xl shadow-pink-400/50 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 rounded-2xl transform hover:-translate-y-3 rounded-10 transition ease-out duration-1000">
              <div className="h-full px-7 py-8 bg-white rounded-lg">
                <Avatar color="cyan" radius="xl">
                  DS
                </Avatar>
                <p className="mb-8 text-lg text-gray-900">
                  &ldquo;Cras ut augue quis dolor tincidunt molestie nec cursus ipsum. Nunc sed
                  venenatis erat. Cras id molestie sem, sit amet vulputate nibh. Sed id metus
                  ligula. Mauris blandit dolor id justo molestie rutrum. Sed elementum ligula
                  mauris. &rdquo;
                </p>
                <h3 className="mb-1.5 font-heading font-bold text-lg text-gray-900">
                  Darrell Steward
                </h3>
                <p className="text-sm text-gray-600">Product Designer</p>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/3 p-5">
            <div className="h-full p-0.5 shadow-2xl shadow-cyan-400/50 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 rounded-2xl transform hover:-translate-y-3 rounded-10 shadow-5xl transition ease-out duration-1000">
              <div className="h-full px-7 py-8 bg-white rounded-lg">
                <Avatar color="cyan" radius="xl">
                  RR
                </Avatar>
                <p className="mb-8 text-lg text-gray-900">
                  &ldquo;Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
                  pellentesque eget mauris vel finibus. Ut faucibus dui congue enim varius
                  aliquet.&rdquo;{" "}
                </p>
                <h3 className="mb-1.5 font-heading font-bold text-lg text-gray-900">
                  Ronald Richards
                </h3>
                <p className="text-sm text-gray-600">Software Engineer</p>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/3 p-5">
            <div className="h-full p-0.5 bg-gradient-to-r shadow-2xl shadow-lime-400/50 from-red-400 via-gray-300 to-blue-500 rounded-2xl transform hover:-translate-y-3 rounded-10 transition ease-out duration-1000">
              <div className="h-full px-7 py-8 bg-white rounded-lg">
                <Avatar color="cyan" radius="xl">
                  DS
                </Avatar>
                <p className="mb-8 text-lg text-gray-900">
                  &ldquo;Quisque a ligula bibendum, auctor dui at, gravida augue. Morbi vehicula
                  euismod mauris, eu molestie erat maximus ac. Donec interdum nibh a tortor faucibus
                  mattis.&rdquo;
                </p>
                <h3 className="mb-1.5 font-heading font-bold text-lg text-gray-900">
                  Darrell Steward
                </h3>
                <p className="text-sm text-gray-600">Product Designer</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
