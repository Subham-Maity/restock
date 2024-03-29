"use client";
import React from "react";

import Link from "next/link";
import { ImDribbble } from "react-icons/im";
import {
  FaAngellist,
  FaArrowRight,
  FaBalanceScale,
  FaClipboardCheck,
  FaClock,
  FaCreditCard,
  FaDribbble,
  FaExclamationTriangle,
  FaFacebook,
  FaFacebookF,
  FaGithub,
  FaGlobe,
  FaHandshake,
  FaInfoCircle,
  FaInstagram,
  FaLinkedin,
  FaLock,
  FaMoneyBillWave,
  FaPhone,
  FaQuestionCircle,
  FaRecycle,
  FaShieldAlt,
  FaShippingFast,
  FaSitemap,
  FaStar,
  FaTruck,
  FaTwitter,
  FaUsers,
  FaUserSecret,
} from "react-icons/fa";
import { motion } from "framer-motion";

const HomeFooter = () => {
  return (
    <div className="">
      <footer className="mt-12 bg-gradient-to-r from-[#e5e5e7] via-neutral-[#e5e5e7] to-[#e5e5e7] dark:from-zinc-900 dark:via-neutral-1000 dark:to-slate-900 rounded-t-2xl">
        <div className=" mx-auto px-4 pb-6 pt-16 sm:px-6 lg:px-8">
          <div className="lg:flex lg:items-center lg:justify-between">
            <div className="flex justify-center text-gray-600 sm:justify-start">
              <p className="font-bold text-2xl dark:text-gray-400 text-neutral-900">
                Our Logo
              </p>
            </div>

            <p className="mt-4 max-w-md text-center leading-relaxed text-gray-500 sm:text-left lg:mt-0">
              Discover the perfect stock footage, including 4K or HD video, in
              our massive royalty-free library
            </p>
          </div>

          <div className="p-4 grid grid-cols-2 gap-6 sm:gap-12 border-t border-gray-300 pt-16 md:grid-cols-6 lg:grid-cols-7">
            <div className="text-left">
              <p className="text-lg font-bold text-gray-900 dark:text-white">
                Get&#160;to Know Us
              </p>
              <ul className="mt-8 space-y-4 text-sm">
                <motion.li
                  whileHover={{ x: 10, y: 0, scale: 1, rotate: 0 }}
                  className="flex items-center"
                >
                  <FaInfoCircle className="text-indigo-700 dark:text-white text-l mr-2" />
                  <Link
                    className="text-indigo-700 group-hover:text-indigo-700 dark:text-white"
                    href="/public"
                  >
                    About Banggood.in
                  </Link>
                </motion.li>

                <motion.li
                  whileHover={{ x: 10, y: 0, scale: 1, rotate: 0 }}
                  className="flex items-center"
                >
                  <FaClipboardCheck className="text-indigo-700 dark:text-white text-l mr-2" />
                  <Link
                    className="text-indigo-700 transition hover:text-indigo-700/75 dark:text-white"
                    href="/public"
                  >
                    Guarantees & Return Policy
                  </Link>
                </motion.li>

                <motion.li
                  whileHover={{ x: 10, y: 0, scale: 1, rotate: 0 }}
                  className="flex items-center"
                >
                  <FaPhone className="text-indigo-700 dark:text-white mr-2" />
                  <Link
                    className="text-indigo-700 transition hover:text-indigo-700/75 dark:text-white"
                    href="/public"
                  >
                    Contact Us
                  </Link>
                </motion.li>

                <motion.li
                  whileHover={{ x: 10, y: 0, scale: 1, rotate: 0 }}
                  className="flex items-center"
                >
                  <FaQuestionCircle className="text-indigo-700 dark:text-white mr-2" />
                  <Link
                    className="text-indigo-700 transition hover:text-indigo-700/75 dark:text-white"
                    href="/public"
                  >
                    Help Center
                  </Link>
                </motion.li>

                <motion.li
                  whileHover={{ x: 10, y: 0, scale: 1, rotate: 0 }}
                  className="flex items-center"
                >
                  <FaSitemap className="text-indigo-700 dark:text-white mr-2" />
                  <Link
                    className="text-indigo-700 transition hover:text-indigo-700/75 dark:text-white"
                    href="/public"
                  >
                    Site Map
                  </Link>
                </motion.li>

                <motion.li
                  whileHover={{ x: 10, y: 0, scale: 1, rotate: 0 }}
                  className="flex items-center"
                >
                  <FaBalanceScale className="text-indigo-700 dark:text-white text-2xl mr-2" />
                  <Link
                    className="text-indigo-700 transition hover:text-indigo-700/75 dark:text-white"
                    href="/public"
                  >
                    Intellectual Property Claims
                  </Link>
                </motion.li>
              </ul>
            </div>

            <div className="text-left">
              <p className="text-lg font-bold text-gray-900 dark:text-white">
                Payment & Shipping
              </p>
              <ul className="mt-8 space-y-4 text-sm">
                <motion.li
                  whileHover={{ x: 10, y: 0, scale: 1, rotate: 0 }}
                  className="flex items-center"
                >
                  <FaCreditCard className="text-indigo-700 dark:text-white text-l mr-2" />
                  <Link
                    className="text-indigo-700 group-hover:text-indigo-700 dark:text-white"
                    href="/public"
                  >
                    Payment Methods
                  </Link>
                </motion.li>

                <motion.li
                  whileHover={{ x: 10, y: 0, scale: 1, rotate: 0 }}
                  className="flex items-center"
                >
                  <FaMoneyBillWave className="text-indigo-700 dark:text-white text-l mr-2" />
                  <Link
                    className="text-indigo-700 transition hover:text-indigo-700/75 dark:text-white"
                    href="/public"
                  >
                    BGpay Instruction
                  </Link>
                </motion.li>

                <motion.li
                  whileHover={{ x: 10, y: 0, scale: 1, rotate: 0 }}
                  className="flex items-center"
                >
                  <FaShippingFast className="text-indigo-700 dark:text-white text-l mr-2" />
                  <Link
                    className="text-indigo-700 transition hover:text-indigo-700/75 dark:text-white"
                    href="/public"
                  >
                    Shipping Guide
                  </Link>
                </motion.li>

                <motion.li
                  whileHover={{ x: 10, y: 0, scale: 1, rotate: 0 }}
                  className="flex items-center"
                >
                  <FaGlobe className="text-indigo-700 dark:text-white text-l mr-2" />
                  <Link
                    className="text-indigo-700 transition hover:text-indigo-700/75 dark:text-white"
                    href="/public"
                  >
                    Locations We Ship To
                  </Link>
                </motion.li>

                <motion.li
                  whileHover={{ x: 10, y: 0, scale: 1, rotate: 0 }}
                  className="flex items-center"
                >
                  <FaClock className="text-indigo-700 dark:text-white text-l mr-2" />
                  <Link
                    className="text-indigo-700 transition hover:text-indigo-700/75 dark:text-white"
                    href="/public"
                  >
                    Estimated Delivery Time
                  </Link>
                </motion.li>
              </ul>
            </div>

            <div className="text-left">
              <p className="text-lg font-bold text-gray-900 dark:text-white">
                CONSUMER POLICY
              </p>
              <ul className="mt-8 space-y-4 text-sm">
                <motion.li
                  whileHover={{ x: 10, y: 0, scale: 1, rotate: 0 }}
                  className="flex items-center"
                >
                  <FaClipboardCheck className="text-indigo-700 dark:text-white text-l mr-2" />
                  <Link
                    className="text-indigo-700 group-hover:text-indigo-700 dark:text-white"
                    href="/public"
                  >
                    Cancellation & Returns
                  </Link>
                </motion.li>

                <motion.li
                  whileHover={{ x: 10, y: 0, scale: 1, rotate: 0 }}
                  className="flex items-center"
                >
                  <FaShieldAlt className="text-indigo-700 dark:text-white text-l mr-2" />
                  <Link
                    className="text-indigo-700 transition hover:text-indigo-700/75 dark:text-white"
                    href="/public"
                  >
                    Terms Of Use
                  </Link>
                </motion.li>

                <motion.li
                  whileHover={{ x: 10, y: 0, scale: 1, rotate: 0 }}
                  className="flex items-center"
                >
                  <FaLock className="text-indigo-700 dark:text-white text-l mr-2" />
                  <Link
                    className="text-indigo-700 transition hover:text-indigo-700/75 dark:text-white"
                    href="/public"
                  >
                    Security
                  </Link>
                </motion.li>

                <motion.li
                  whileHover={{ x: 10, y: 0, scale: 1, rotate: 0 }}
                  className="flex items-center"
                >
                  <FaUserSecret className="text-indigo-700 dark:text-white  mr-2" />
                  <Link
                    className="text-indigo-700 transition hover:text-indigo-700/75 dark:text-white"
                    href="/public"
                  >
                    Privacy
                  </Link>
                </motion.li>

                <motion.li
                  whileHover={{ x: 10, y: 0, scale: 1, rotate: 0 }}
                  className="flex items-center"
                >
                  <FaExclamationTriangle className="text-indigo-700 dark:text-white text-l mr-2" />
                  <Link
                    className="text-indigo-700 transition hover:text-indigo-700/75 dark:text-white"
                    href="/public"
                  >
                    Grievance Redressal
                  </Link>
                </motion.li>

                <motion.li
                  whileHover={{ x: 10, y: 0, scale: 1, rotate: 0 }}
                  className="flex items-center"
                >
                  <FaRecycle className="text-indigo-700 dark:text-white text-xl mr-2" />
                  <Link
                    className="text-indigo-700 transition hover:text-indigo-700/75 dark:text-white"
                    href="/public"
                  >
                    EPR Compliance
                  </Link>
                </motion.li>
              </ul>
            </div>

            <div className="text-left">
              <p className="text-lg font-bold text-gray-900 dark:text-white">
                Partnership Programs
              </p>
              <ul className="mt-8 space-y-4 text-sm">
                <motion.li
                  whileHover={{ x: 10, y: 0, scale: 1, rotate: 0 }}
                  className="flex items-center"
                >
                  <FaHandshake className="text-indigo-700 dark:text-white text-xl mr-2" />
                  <Link
                    className="text-indigo-700 group-hover:text-indigo-700 dark:text-white"
                    href="/public"
                  >
                    Drop shipping
                  </Link>
                </motion.li>

                <motion.li
                  whileHover={{ x: 10, y: 0, scale: 1, rotate: 0 }}
                  className="flex items-center"
                >
                  <FaTruck className="text-indigo-700 dark:text-white text-l mr-2" />
                  <Link
                    className="text-indigo-700 transition hover:text-indigo-700/75 dark:text-white"
                    href="/public"
                  >
                    Review Club
                  </Link>
                </motion.li>

                <motion.li
                  whileHover={{ x: 10, y: 0, scale: 1, rotate: 0 }}
                  className="flex items-center"
                >
                  <FaStar className="text-indigo-700 dark:text-white text-xl mr-2" />
                  <Link
                    className="text-indigo-700 transition hover:text-indigo-700/75 dark:text-white"
                    href="/public"
                  >
                    Affiliate Program
                  </Link>
                </motion.li>

                <motion.li
                  whileHover={{ x: 10, y: 0, scale: 1, rotate: 0 }}
                  className="flex items-center"
                >
                  <FaUsers className="text-indigo-700 dark:text-white text-xl mr-2" />
                  <Link
                    className="text-indigo-700 transition hover:text-indigo-700/75 dark:text-white"
                    href="/public"
                  >
                    Wholesale Program
                  </Link>
                </motion.li>
              </ul>
            </div>

            <div className="text-left">
              <p className="text-lg font-bold text-gray-900 dark:text-white">
                Social
              </p>
              <ul className="mt-8 space-y-4 text-sm">
                <motion.li whileHover={{ x: 10, y: 0, scale: 1, rotate: 0 }}>
                  <Link
                    className="text-indigo-700 transition hover:text-indigo-700/75 dark:text-white"
                    href="/public"
                  >
                    <FaTwitter className="inline-block mr-2" />
                    Twitter
                  </Link>
                </motion.li>

                <motion.li whileHover={{ x: 10, y: 0, scale: 1, rotate: 0 }}>
                  <Link
                    className="text-indigo-700 transition hover:text-indigo-700/75 dark:text-white"
                    href="/public"
                  >
                    <FaLinkedin className="inline-block mr-2" />
                    LinkedIn
                  </Link>
                </motion.li>

                <motion.li whileHover={{ x: 10, y: 0, scale: 1, rotate: 0 }}>
                  <Link
                    className="text-indigo-700 transition hover:text-indigo-700/75 dark:text-white"
                    href="/public"
                  >
                    <FaFacebook className="inline-block mr-2" />
                    Facebook
                  </Link>
                </motion.li>

                <motion.li whileHover={{ x: 10, y: 0, scale: 1, rotate: 0 }}>
                  <Link
                    className="text-indigo-700 transition hover:text-indigo-700/75 dark:text-white"
                    href="/public"
                  >
                    <FaGithub className="inline-block mr-2" />
                    Github
                  </Link>
                </motion.li>

                <motion.li whileHover={{ x: 10, y: 0, scale: 1, rotate: 0 }}>
                  <Link
                    className="text-indigo-700 transition hover:text-indigo-700/75 dark:text-white"
                    href="/public"
                  >
                    <FaAngellist className="inline-block mr-2" />
                    AngelList
                  </Link>
                </motion.li>

                <motion.li whileHover={{ x: 10, y: 0, scale: 1, rotate: 0 }}>
                  <Link
                    className="text-indigo-700 transition hover:text-indigo-700/75 dark:text-white"
                    href="/public"
                  >
                    <FaDribbble className="inline-block mr-2" />
                    Dribble
                  </Link>
                </motion.li>
              </ul>
            </div>

            <div className="text-left md:col-span-4 lg:col-span-2">
              <motion.p className="text-lg font-bold text-gray-900 dark:text-white">
                Stay in touch, Get weekly updates . . .
              </motion.p>

              <div className="mx-auto mt-8 max-w-md sm:ms-0">
                <div className="text-center sm:text-left md:col-span-4 lg:col-span-2">
                  <div className="mx-auto mt-8 max-w-md sm:ms-0">
                    <div className="flex flex-col gap-4 sm:flex-row lg:flex-col lg:items-start">
                      <label className="sr-only">Email</label>

                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        placeholder="Enter your email"
                        required
                        className="block w-full rounded-2xl h-11 bg-white bg-opacity-30 dark:bg-stone-950/20 shadow-2xl  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:ring-blue-500 focus:border-blue-800 sm:text-sm sm:leading-6"
                      />

                      <button className="relative inline-flex items-center justify-center sm:w-full p-4 py-3 overflow-hidden font-medium text-indigo-500 transition duration-100 ease-out border-2 dark:border-indigo-500/30 rounded-2xl shadow-xl group">
                        <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white text-2xl duration-100 -translate-x-full bg-indigo-600 dark:bg-indigo-500 group-hover:translate-x-0 ease">
                          <FaArrowRight />
                        </span>
                        <span className="absolute flex items-center justify-center w-full h-full text-indigo-500 dark:text-indigo-400 transition-all duration-300 transform group-hover:translate-x-full ease">
                          Subscribe
                        </span>
                        <span className="relative invisible">Subscribe</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className=" mt-16 border-t border-gray-300 pt-6 sm:flex sm:items-center sm:justify-between">
            <p className="text-center text-sm text-white-500 sm:text-left dark:text-white">
              Copyright & copy 2023. All rights reserved. Made with love
            </p>

            <ul className="mt-4 flex justify-center gap-6 sm:mt-0 sm:justify-start">
              <motion.li
                whileHover={{
                  x: 0,
                  y: -5,
                  scale: 1,
                  rotate: 0,
                }}
              >
                <Link
                  href="/public"
                  rel="noreferrer"
                  target="_blank"
                  className="text-indigo-700 transition hover:text-indigo-700/75"
                >
                  <span className="sr-only">Facebook</span>
                  <FaFacebookF className="h-6 w-6 dark:text-white" />
                </Link>
              </motion.li>

              <motion.li
                whileHover={{
                  x: 0,
                  y: -5,
                  scale: 1,
                  rotate: 0,
                }}
              >
                <Link
                  href="/public"
                  rel="noreferrer"
                  target="_blank"
                  className="text-indigo-700 transition hover:text-indigo-700/75"
                >
                  <FaInstagram className="h-6 w-6 dark:text-white" />

                  <span className="sr-only">Instagram</span>
                </Link>
              </motion.li>

              <motion.li
                whileHover={{
                  x: 0,
                  y: -5,
                  scale: 1,
                  rotate: 0,
                }}
              >
                <Link
                  href="/public"
                  rel="noreferrer"
                  target="_blank"
                  className="text-indigo-700 transition hover:text-indigo-700/75"
                >
                  <span className="sr-only">Twitter</span>
                  <FaTwitter className="h-6 w-6 dark:text-white" />
                </Link>
              </motion.li>

              <motion.li
                whileHover={{
                  x: 0,
                  y: -5,
                  scale: 1,
                  rotate: 0,
                }}
              >
                <Link
                  href="/public"
                  rel="noreferrer"
                  target="_blank"
                  className="text-indigo-700 transition hover:text-indigo-700/75"
                >
                  <span className="sr-only">GitHub</span>
                  <FaGithub className="h-6 w-6 dark:text-white" />
                </Link>
              </motion.li>

              <motion.li
                whileHover={{
                  x: 0,
                  y: -5,
                  scale: 1,
                  rotate: 0,
                }}
              >
                <Link
                  href="/public"
                  rel="noreferrer"
                  target="_blank"
                  className="text-indigo-700 transition hover:text-indigo-700/75"
                >
                  <span className="sr-only">Dribbble</span>
                  <ImDribbble className="h-6 w-6 dark:text-white" />
                </Link>
              </motion.li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomeFooter;
