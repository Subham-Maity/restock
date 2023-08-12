"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ImDribbble } from "react-icons/im";
import { FaFacebookF, FaGithub, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <div>
      <footer className="bg-gray-200 p-4 lg:pl-8">
        <div className=" mx-auto px-4 pb-6 pt-16 sm:px-6 lg:px-8">
          <div className="lg:flex lg:items-center lg:justify-between">
            <div className="flex justify-center text-gray-600 sm:justify-start">
              <Image
                className="mx-auto "
                src="/Logoblack.png"
                alt="Your Company"
                width={250}
                height={250}
              />
            </div>

            <p className="mt-4 max-w-md text-center leading-relaxed text-gray-500 sm:text-left lg:mt-0">
              Discover the perfect stock footage, including 4K or HD video, in
              our massive royalty-free library
            </p>
          </div>

          <div className="mt-16 grid grid-cols-2 gap-24 border-t border-gray-300 pt-16 md:grid-cols-6 lg:grid-cols-7">
            <div className="text-center sm:text-left">
              <p className="text-lg font-bold text-gray-900">Product</p>

              <ul className="mt-8 space-y-4 text-sm">
                <li>
                  <Link
                    className="text-indigo-700 group-hover:text-indigo-700"
                    href="/"
                  >
                    Overview
                  </Link>
                </li>

                <li>
                  <Link
                    className="text-indigo-700 transition hover:text-indigo-700/75"
                    href="/"
                  >
                    Features
                  </Link>
                </li>

                <li>
                  <Link
                    className="text-indigo-700 transition hover:text-indigo-700/75"
                    href="/"
                  >
                    Solutions
                  </Link>
                </li>

                <li>
                  <Link
                    className="text-indigo-700 transition hover:text-indigo-700/75"
                    href="/"
                  >
                    Tutorial
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-indigo-700 transition hover:text-indigo-700/75"
                    href="/"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-indigo-700 transition hover:text-indigo-700/75"
                    href="/"
                  >
                    Releases
                  </Link>
                </li>
              </ul>
            </div>

            <div className="text-center sm:text-left">
              <p className="text-lg font-bold text-gray-900">Company</p>

              <ul className="mt-8 space-y-4 text-sm">
                <li>
                  <Link
                    className="text-indigo-700 transition hover:text-indigo-700/75"
                    href="/"
                  >
                    About Us
                  </Link>
                </li>

                <li>
                  <Link
                    className="text-indigo-700 transition hover:text-indigo-700/75"
                    href="/"
                  >
                    Careers
                  </Link>
                </li>

                <li>
                  <Link
                    className="text-indigo-700 transition hover:text-indigo-700/75"
                    href="/"
                  >
                    Press
                  </Link>
                </li>

                <li>
                  <Link
                    className="text-indigo-700 transition hover:text-indigo-700/75"
                    href="/"
                  >
                    News
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-indigo-700 transition hover:text-indigo-700/75"
                    href="/"
                  >
                    Media Kit
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-indigo-700 transition hover:text-indigo-700/75"
                    href="/"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div className="text-center sm:text-left">
              <p className="text-lg font-bold text-gray-900">Resources</p>

              <ul className="mt-8 space-y-4 text-sm">
                <li>
                  <Link
                    className="text-indigo-700 transition hover:text-indigo-700/75"
                    href="/"
                  >
                    Blog
                  </Link>
                </li>

                <li>
                  <Link
                    className="text-indigo-700 transition hover:text-indigo-700/75"
                    href="/"
                  >
                    Newsletters
                  </Link>
                </li>

                <li>
                  <Link
                    className="text-indigo-700 transition hover:text-indigo-700/75"
                    href="/"
                  >
                    Events
                  </Link>
                </li>

                <li>
                  <Link
                    className="text-indigo-700 transition hover:text-indigo-700/75"
                    href="/"
                  >
                    Help Center
                  </Link>
                </li>

                <li>
                  <Link
                    className="text-indigo-700 transition hover:text-indigo-700/75"
                    href="/"
                  >
                    Tutorials
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-indigo-700 transition hover:text-indigo-700/75"
                    href="/"
                  >
                    Support
                  </Link>
                </li>
              </ul>
            </div>
            <div className="text-center sm:text-left">
              <p className="text-lg font-bold text-gray-900">Resources</p>

              <ul className="mt-8 space-y-4 text-sm">
                <li>
                  <Link
                    className="text-indigo-700 transition hover:text-indigo-700/75"
                    href="/"
                  >
                    Blog
                  </Link>
                </li>

                <li>
                  <Link
                    className="text-indigo-700 transition hover:text-indigo-700/75"
                    href="/"
                  >
                    Newsletters
                  </Link>
                </li>

                <li>
                  <Link
                    className="text-indigo-700 transition hover:text-indigo-700/75"
                    href="/"
                  >
                    Events
                  </Link>
                </li>

                <li>
                  <Link
                    className="text-indigo-700 transition hover:text-indigo-700/75"
                    href="/"
                  >
                    Help Center
                  </Link>
                </li>

                <li>
                  <Link
                    className="text-indigo-700 transition hover:text-indigo-700/75"
                    href="/"
                  >
                    Tutorials
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-indigo-700 transition hover:text-indigo-700/75"
                    href="/"
                  >
                    Support
                  </Link>
                </li>
              </ul>
            </div>

            <div className="text-center sm:text-left">
              <p className="text-lg font-bold text-gray-900">Social</p>

              <ul className="mt-8 space-y-4 text-sm">
                <li>
                  <Link
                    className="text-indigo-700 transition hover:text-indigo-700/75"
                    href="/"
                  >
                    Twitter
                  </Link>
                </li>

                <li>
                  <Link
                    className="text-indigo-700 transition hover:text-indigo-700/75"
                    href="/"
                  >
                    LinkedIn
                  </Link>
                </li>

                <li>
                  <Link
                    className="text-indigo-700 transition hover:text-indigo-700/75"
                    href="/"
                  >
                    Facebook
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-indigo-700 transition hover:text-indigo-700/75"
                    href="/"
                  >
                    Github
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-indigo-700 transition hover:text-indigo-700/75"
                    href="/"
                  >
                    AngelList
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-indigo-700 transition hover:text-indigo-700/75"
                    href="/"
                  >
                    Dribble
                  </Link>
                </li>
              </ul>
            </div>

            <div className="text-center sm:text-left md:col-span-4 lg:col-span-2">
              <p className="text-lg font-bold text-gray-900">Stay in touch</p>

              <div className="mx-auto mt-8 max-w-md sm:ms-0">
                {/*<div className="flex flex-col gap-4 sm:flex-row lg:flex-col lg:items-start">*/}
                {/*  <button type="submit">*/}
                {/*    <Image*/}
                {/*      className="mx-auto "*/}
                {/*      src="/Footer/AppStore.svg"*/}
                {/*      alt="Your Company"*/}
                {/*      width={150}*/}
                {/*      height={150}*/}
                {/*    />*/}
                {/*  </button>*/}

                {/*  <button type="submit">*/}
                {/*    <Image*/}
                {/*      className="mx-auto "*/}
                {/*      src="/Footer/GPay.svg"*/}
                {/*      alt="Your Company"*/}
                {/*      width={150}*/}
                {/*      height={150}*/}
                {/*    />*/}
                {/*  </button>*/}
                {/*</div>*/}
                <div className="text-center sm:text-left md:col-span-4 lg:col-span-2">
                  <div className="mx-auto mt-8 max-w-md sm:ms-0">
                    <div className="flex flex-col gap-4 sm:flex-row lg:flex-col lg:items-start">
                      <label className="sr-only">Email</label>

                      <input
                        className="w-full rounded-full border-gray-200 px-6 py-3 shadow-sm"
                        type="email"
                        placeholder="Enter your email"
                      />

                      <button
                        className="block rounded-full bg-indigo-500 px-8 py-3 font-medium text-white transition hover:bg-indigo-600"
                        type="submit"
                      >
                        Subscribe
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className=" mt-16 border-t border-gray-300 pt-6 sm:flex sm:items-center sm:justify-between">
            <p className="text-center text-sm text-gray-500 sm:text-left">
              Copyright & copy 2022. All rights reserved.
            </p>

            <ul className="mt-4 flex justify-center gap-6 sm:mt-0 sm:justify-start">
              <li>
                <Link
                  href="/"
                  rel="noreferrer"
                  target="_blank"
                  className="text-indigo-700 transition hover:text-indigo-700/75"
                >
                  <span className="sr-only">Facebook</span>
                  <FaFacebookF className="h-6 w-6" />
                </Link>
              </li>

              <li>
                <Link
                  href="/"
                  rel="noreferrer"
                  target="_blank"
                  className="text-indigo-700 transition hover:text-indigo-700/75"
                >
                  <FaInstagram className="h-6 w-6" />

                  <span className="sr-only">Instagram</span>
                </Link>
              </li>

              <li>
                <Link
                  href="/"
                  rel="noreferrer"
                  target="_blank"
                  className="text-indigo-700 transition hover:text-indigo-700/75"
                >
                  <span className="sr-only">Twitter</span>
                  <FaTwitter className="h-6 w-6" />
                </Link>
              </li>

              <li>
                <Link
                  href="/"
                  rel="noreferrer"
                  target="_blank"
                  className="text-indigo-700 transition hover:text-indigo-700/75"
                >
                  <span className="sr-only">GitHub</span>
                  <FaGithub className="h-6 w-6" />
                </Link>
              </li>

              <li>
                <Link
                  href="/"
                  rel="noreferrer"
                  target="_blank"
                  className="text-indigo-700 transition hover:text-indigo-700/75"
                >
                  <span className="sr-only">Dribbble</span>
                  <ImDribbble className="h-6 w-6" />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
