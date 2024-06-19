import { createFileRoute, Link, redirect, useNavigate } from '@tanstack/react-router'
import { useState, useEffect, useRef } from "react"
import { Share } from '@/routes/(page)/-components/share'
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper/modules"
import { AudioPlayer } from "../../../-components/player"
import { AuthGuard } from '@/lib/auth/component'
import { auth } from '@/lib/auth'
import { helpers } from '@/lib/helpers'
import useEmblaCarousel from 'embla-carousel-react'

export const Route = createFileRoute('/(page)/_page/profile/$username/')({
  component: () => <AuthGuard><ProfilePage /></AuthGuard>,
  loader: async ({ params }) => {
    try {
      return helpers.getUserByUsername(params.username)
    }
    catch (err) {
      console.log(err)
      throw redirect({
        to: '/'
      })
    }
  }
})

function ProfilePage() {
  const creator = Route.useLoaderData()
  const { user } = auth.hooks.useAuthUnsafe()

  return (
    <div className="font-futuraMd min-h-screen relative overflow-hidden px-4 xs:px-10 xl:px-20 z-0">
      <div className="w-fit h-fit absolute -top-96 -right-[450px] -z-10">
        <img src="/images/profile_bg.svg" width={1000} height={1000} />
      </div>
      <div className="w-full flex flex-col-reverse items-center xl:items-start gap-y-8 gap-x-4 justify-between mt-36 xl:flex-row">
        <div className="flex flex-col w-full xl:w-8/12 gap-y-16">
          <div className="w-full h-fit">
            <div className="flex flex-col px-0 xs:px-4 sm::px-8 py-4 w-full max-w-[600px] text-lg text-sky-900 dark:text-blue-300">
              <div className="flex flex-col xs:flex-row justify-between items-start gap-4">
                <div className="flex flex-col gap-y-4">
                  <h2 className="text-2xl xxs:text-3xl">{creator.name}</h2>
                  <h2 className="text-2xl xxs:text-3xl">@{creator.username}</h2>
                  <div className="flex gap-x-12 pl-4">
                    <div className="flex flex-col items-center">
                      <h2 className="text-2xl font-bold">{creator.subscribers}</h2>
                      <span className="text-cyan-600 text-sm">Subscribers</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-x-2 w-full xs:w-fit">
                  {creator.username !== user.username ? (
                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-8 w-full py-2 rounded-xl">
                      Edit Profile
                    </button>
                  ) : (
                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-8 w-full py-2 rounded-xl">
                      Follow
                    </button>
                  )}
                  {/* profile share btn */}
                  <div
                    onClick={(e) =>
                      e.currentTarget?.querySelector(".share-modal").showModal()
                    }
                    className="w-fit h-fit cursor-pointer rounded-xl border-2 fill-sky-900 dark:fill-blue-300 dark:hover:fill-sky-500 hover:fill-sky-500 border-blue-500 hover:border-sky-500 p-2"
                  >
                    <svg
                      className="fill-inherit"
                      width="25"
                      height="25"
                      viewBox="0 0 25 25"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M16.6667 4.16808C16.6667 3.06263 17.1057 2.00247 17.8871 1.2208C18.6685 0.439135 19.7283 0 20.8333 0C21.9384 0 22.9982 0.439135 23.7796 1.2208C24.561 2.00247 25 3.06263 25 4.16808C24.9995 4.86997 24.8218 5.56038 24.4834 6.17525C24.145 6.79013 23.6569 7.30956 23.0642 7.68537C22.4716 8.06117 21.7937 8.28119 21.0934 8.32501C20.3932 8.36883 19.6931 8.23503 19.0583 7.93602L15.2167 12.5392L18.6133 17.3042C19.2437 16.9072 19.9688 16.6865 20.7134 16.665C21.4579 16.6436 22.1946 16.8222 22.8467 17.1822C23.4989 17.5423 24.0426 18.0706 24.4213 18.7122C24.8 19.3538 24.9998 20.0853 25 20.8304C25.0002 21.4838 24.8469 22.1281 24.5524 22.7113C24.2579 23.2945 23.8305 23.8002 23.3046 24.1877C22.7787 24.5753 22.1691 24.8337 21.525 24.9422C20.8809 25.0506 20.2204 25.0061 19.5966 24.8122C18.9729 24.6182 18.4035 24.2803 17.9343 23.8257C17.4652 23.3712 17.1094 22.8126 16.8958 22.1951C16.6822 21.5777 16.6167 20.9186 16.7045 20.2712C16.7924 19.6238 17.0312 19.006 17.4017 18.4679L13.7433 13.3395H8.24833C8.03739 14.3482 7.46049 15.2431 6.62893 15.8514C5.79737 16.4598 4.77006 16.7385 3.74517 16.6339C2.72028 16.5293 1.77043 16.0487 1.07884 15.2849C0.387251 14.5211 0.00292512 13.5281 0 12.4976C0.00102746 11.4646 0.385426 10.4689 1.07867 9.70337C1.77191 8.93785 2.72462 8.4571 3.75207 8.35432C4.77952 8.25154 5.80852 8.53405 6.63957 9.14709C7.47062 9.76013 8.04452 10.66 8.25 11.6723H13.77L17.72 6.93735C17.0401 6.17545 16.665 5.18941 16.6667 4.16808Z" />
                    </svg>
                    <Share
                      shareUrl={`${window.location.origin}/profile/${creator.username}`}
                    />
                  </div>
                </div>
              </div>
              <p className="py-4">{creator.bio}</p>
            </div>
            <PodcastsList />
          </div>
        </div>
        {user.addr === creator.addr && (
          <div className="w-full xl:w-80 flex flex-col gap-y-4">
            <Link
              to="/profile/$username/create"
              className="w-full flex items-center justify-center gap-x-4 bg-blue-500 hover:bg-blue-600 rounded-3xl text-white p-4 text-lg text-nowrap"
            >
              <img src="/images/livestream_icon.svg" width={50} height={50} />
              <span>Create new Podcast</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

const PodcastsList = () => {
  const creator = Route.useLoaderData()

  return null
}
