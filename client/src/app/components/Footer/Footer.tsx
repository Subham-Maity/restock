"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ImDribbble } from "react-icons/im";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { FaTwitter, FaLinkedin, FaFacebook, FaGithub, FaAngellist, FaDribbble } from 'react-icons/fa';
import {motion} from 'framer-motion';
import { FaBlog, FaCalendar, FaBook, FaLifeRing } from 'react-icons/fa';
import { FaBriefcase, FaNewspaper, FaBullhorn, FaRegFileAlt, FaEnvelope } from 'react-icons/fa';
import { FaEye, FaLightbulb, FaChalkboardTeacher, FaDollarSign, FaCodeBranch } from 'react-icons/fa';
import { FaInfoCircle, FaClipboardCheck, FaPhone, FaQuestionCircle, FaSitemap, FaBalanceScale } from 'react-icons/fa';
import { FaCreditCard, FaMoneyBillWave, FaShippingFast, FaGlobe, FaClock } from 'react-icons/fa';
import { FaShieldAlt, FaLock, FaUserSecret, FaExclamationTriangle, FaRecycle } from 'react-icons/fa';
import { FaHandshake, FaTruck, FaStar, FaUsers, FaBoxes } from 'react-icons/fa';

const Footer = () => {
  return (
    <div className="">
      <footer className="bg-gradient-to-r from-zinc-400 via-neutral-400 to-slate-400 dark:from-zinc-800 dark:via-neutral-900 dark:to-slate-800 rounded-t-2xl">
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

          <div className=" grid grid-cols-2 gap-24 border-t border-gray-300 pt-16 md:grid-cols-6 lg:grid-cols-7">

            <div className="text-center sm:text-left">
              <p className="text-lg font-bold text-gray-900 dark:text-white">Get&#160;to Know Us</p>
              <ul className="mt-8 space-y-4 text-sm">
                <motion.li whileHover={{ x: 10, y: 0, scale: 1, rotate: 0 }} className="flex items-center">
                  <FaInfoCircle className="text-indigo-700 dark:text-white text-xl mr-2" />
                  <Link className="text-indigo-700 group-hover:text-indigo-700 dark:text-white" href="/">
                    About Banggood.in
                  </Link>
                </motion.li>

                <motion.li whileHover={{ x: 10, y: 0, scale: 1, rotate: 0 }} className="flex items-center">
                  <FaClipboardCheck className="text-indigo-700 dark:text-white text-xl mr-2" />
                  <Link className="text-indigo-700 transition hover:text-indigo-700/75 dark:text-white" href="/">
                    Guarantees & Return Policy
                  </Link>
                </motion.li>

                <motion.li whileHover={{ x: 10, y: 0, scale: 1, rotate: 0 }} className="flex items-center">
                  <FaPhone className="text-indigo-700 dark:text-white mr-2" />
                  <Link className="text-indigo-700 transition hover:text-indigo-700/75 dark:text-white" href="/">
                    Contact Us
                  </Link>
                </motion.li>

                <motion.li whileHover={{ x: 10, y: 0, scale: 1, rotate: 0 }} className="flex items-center">
                  <FaQuestionCircle className="text-indigo-700 dark:text-white mr-2" />
                  <Link className="text-indigo-700 transition hover:text-indigo-700/75 dark:text-white" href="/">
                    Help Center
                  </Link>
                </motion.li>

                <motion.li whileHover={{ x: 10, y: 0, scale: 1, rotate: 0 }} className="flex items-center">
                  <FaSitemap className="text-indigo-700 dark:text-white mr-2" />
                  <Link className="text-indigo-700 transition hover:text-indigo-700/75 dark:text-white" href="/">
                    Site Map
                  </Link>
                </motion.li>

                <motion.li whileHover={{ x: 10, y: 0, scale: 1, rotate: 0 }} className="flex items-center">
                  <FaBalanceScale className="text-indigo-700 dark:text-white text-4xl mr-2" />
                  <Link className="text-indigo-700 transition hover:text-indigo-700/75 dark:text-white" href="/">
                    Intellectual Property Claims
                  </Link>
                </motion.li>

                <motion.li whileHover={{ x: 10, y: 0, scale: 1, rotate: 0 }} className="flex items-center">
                  <FaTwitter className="text-indigo-700 dark:text-white text-l mr-2" />
                  <Link className="text-indigo-700 transition hover:text-indigo-700/75 dark:text-white" href="/">
                    Twitter
                  </Link>
                </motion.li>
              </ul>
            </div>

            <div className="text-center sm:text-left">
              <p className="text-lg font-bold text-gray-900 dark:text-white">Payment & Shipping</p>
              <ul className="mt-8 space-y-4 text-sm">
                <motion.li whileHover={{ x: 10, y: 0, scale: 1, rotate: 0 }} className="flex items-center">
                  <FaCreditCard className="text-indigo-700 dark:text-white text-xl mr-2" />
                  <Link className="text-indigo-700 group-hover:text-indigo-700 dark:text-white" href="/">
                    Payment Methods
                  </Link>
                </motion.li>

                <motion.li whileHover={{ x: 10, y: 0, scale: 1, rotate: 0 }} className="flex items-center">
                  <FaMoneyBillWave className="text-indigo-700 dark:text-white text-xl mr-2" />
                  <Link className="text-indigo-700 transition hover:text-indigo-700/75 dark:text-white" href="/">
                    BGpay Instruction
                  </Link>
                </motion.li>

                <motion.li whileHover={{ x: 10, y: 0, scale: 1, rotate: 0 }} className="flex items-center">
                  <FaShippingFast className="text-indigo-700 dark:text-white text-xl mr-2" />
                  <Link className="text-indigo-700 transition hover:text-indigo-700/75 dark:text-white" href="/">
                    Shipping Guide
                  </Link>
                </motion.li>

                <motion.li whileHover={{ x: 10, y: 0, scale: 1, rotate: 0 }} className="flex items-center">
                  <FaGlobe className="text-indigo-700 dark:text-white text-2xl mr-2" />
                  <Link className="text-indigo-700 transition hover:text-indigo-700/75 dark:text-white" href="/">
                    Locations We Ship To
                  </Link>
                </motion.li>

                <motion.li whileHover={{ x: 10, y: 0, scale: 1, rotate: 0 }} className="flex items-center">
                  <FaClock className="text-indigo-700 dark:text-white text-2xl mr-2" />
                  <Link className="text-indigo-700 transition hover:text-indigo-700/75 dark:text-white" href="/">
                    Estimated Delivery Time
                  </Link>
                </motion.li>
              </ul>
            </div>

            <div className="text-center sm:text-left">
              <p className="text-lg font-bold text-gray-900 dark:text-white">CONSUMER POLICY</p>
              <ul className="mt-8 space-y-4 text-sm">
                <motion.li whileHover={{ x: 10, y: 0, scale: 1, rotate: 0 }} className="flex items-center">
                  <FaClipboardCheck className="text-indigo-700 dark:text-white text-xl mr-2" />
                  <Link className="text-indigo-700 group-hover:text-indigo-700 dark:text-white" href="/">
                    Cancellation & Returns
                  </Link>
                </motion.li>

                <motion.li whileHover={{ x: 10, y: 0, scale: 1, rotate: 0 }} className="flex items-center">
                  <FaShieldAlt className="text-indigo-700 dark:text-white text-l mr-2" />
                  <Link className="text-indigo-700 transition hover:text-indigo-700/75 dark:text-white" href="/">
                    Terms Of Use
                  </Link>
                </motion.li>

                <motion.li whileHover={{ x: 10, y: 0, scale: 1, rotate: 0 }} className="flex items-center">
                  <FaLock className="text-indigo-700 dark:text-white text-l mr-2" />
                  <Link className="text-indigo-700 transition hover:text-indigo-700/75 dark:text-white" href="/">
                    Security
                  </Link>
                </motion.li>

                <motion.li whileHover={{ x: 10, y: 0, scale: 1, rotate: 0 }} className="flex items-center">
                  <FaUserSecret className="text-indigo-700 dark:text-white text-l mr-2" />
                  <Link className="text-indigo-700 transition hover:text-indigo-700/75 dark:text-white" href="/">
                    Privacy
                  </Link>
                </motion.li>

                <motion.li whileHover={{ x: 10, y: 0, scale: 1, rotate: 0 }} className="flex items-center">
                  <FaExclamationTriangle className="text-indigo-700 dark:text-white text-2xl mr-2" />
                  <Link className="text-indigo-700 transition hover:text-indigo-700/75 dark:text-white" href="/">
                    Grievance Redressal
                  </Link>
                </motion.li>

                <motion.li whileHover={{ x: 10, y: 0, scale: 1, rotate: 0 }} className="flex items-center">
                  <FaRecycle className="text-indigo-700 dark:text-white text-2xl mr-2" />
                  <Link className="text-indigo-700 transition hover:text-indigo-700/75 dark:text-white" href="/">
                    EPR Compliance
                  </Link>
                </motion.li>
              </ul>
            </div>

            <div className="text-center sm:text-left">
              <p className="text-lg font-bold text-gray-900 dark:text-white">Partnership Programs</p>
              <ul className="mt-8 space-y-4 text-sm">
                <motion.li whileHover={{ x: 10, y: 0, scale: 1, rotate: 0 }} className="flex items-center">
                  <FaHandshake className="text-indigo-700 dark:text-white text-xl mr-2" />
                  <Link className="text-indigo-700 group-hover:text-indigo-700 dark:text-white" href="/">
                    Drop shipping
                  </Link>
                </motion.li>

                <motion.li whileHover={{ x: 10, y: 0, scale: 1, rotate: 0 }} className="flex items-center">
                  <FaTruck className="text-indigo-700 dark:text-white text-l mr-2" />
                  <Link className="text-indigo-700 transition hover:text-indigo-700/75 dark:text-white" href="/">
                    Review Club
                  </Link>
                </motion.li>

                <motion.li whileHover={{ x: 10, y: 0, scale: 1, rotate: 0 }} className="flex items-center">
                  <FaStar className="text-indigo-700 dark:text-white text-xl mr-2" />
                  <Link className="text-indigo-700 transition hover:text-indigo-700/75 dark:text-white" href="/">
                    Affiliate Program
                  </Link>
                </motion.li>

                <motion.li whileHover={{ x: 10, y: 0, scale: 1, rotate: 0 }} className="flex items-center">
                  <FaUsers className="text-indigo-700 dark:text-white text-xl mr-2" />
                  <Link className="text-indigo-700 transition hover:text-indigo-700/75 dark:text-white" href="/">
                    Wholesale Program
                  </Link>
                </motion.li>
              </ul>
            </div>


            <div className="text-center sm:text-left">
              <p className="text-lg font-bold text-gray-900 dark:text-white">Social</p>
              <ul className="mt-8 space-y-4 text-sm">
                <motion.li whileHover={{x: 10,
                  y: 0,
                  scale: 1,
                  rotate: 0}}>
                  <Link className="text-indigo-700 transition hover:text-indigo-700/75 dark:text-white" href="/">
                    <FaTwitter className="inline-block mr-2" />
                    Twitter
                  </Link>
                </motion.li>

                <motion.li whileHover={{x: 10,
                  y: 0,
                  scale: 1,
                  rotate: 0}}>
                  <Link className="text-indigo-700 transition hover:text-indigo-700/75 dark:text-white" href="/">
                    <FaLinkedin className="inline-block mr-2" />
                    LinkedIn
                  </Link>
                </motion.li>

                <motion.li whileHover={{x: 10,
                  y: 0,
                  scale: 1,
                  rotate: 0}}>
                  <Link className="text-indigo-700 transition hover:text-indigo-700/75 dark:text-white" href="/">
                    <FaFacebook className="inline-block mr-2" />
                    Facebook
                  </Link>
                </motion.li>

                <motion.li whileHover={{x: 10,
                  y: 0,
                  scale: 1,
                  rotate: 0}}>
                  <Link className="text-indigo-700 transition hover:text-indigo-700/75 dark:text-white" href="/">
                    <FaGithub className="inline-block mr-2" />
                    Github
                  </Link>
                </motion.li>

                <motion.li whileHover={{x: 10,
                  y: 0,
                  scale: 1,
                  rotate: 0}}>
                  <Link className="text-indigo-700 transition hover:text-indigo-700/75 dark:text-white" href="/">
                    <FaAngellist className="inline-block mr-2" />
                    AngelList
                  </Link>
                </motion.li>

                <motion.li whileHover={{x: 10,
                  y: 0,
                  scale: 1,
                  rotate: 0}}>
                  <Link className="text-indigo-700 transition hover:text-indigo-700/75 dark:text-white" href="/">
                    <FaDribbble className="inline-block mr-2" />
                    Dribble
                  </Link>
                </motion.li>
              </ul>

            </div>

            <div className="text-center sm:text-left md:col-span-4 lg:col-span-2">
              <motion.p className="text-lg font-bold text-gray-900 dark:text-white">Stay in touch</motion.p>

              <div className="mx-auto mt-8 max-w-md sm:ms-0">
                <div className="text-center sm:text-left md:col-span-4 lg:col-span-2">
                  <div className="mx-auto mt-8 max-w-md sm:ms-0">
                    <div className="flex flex-col gap-4 sm:flex-row lg:flex-col lg:items-start">
                      <label className="sr-only">Email</label>

                      <input
                        className="w-full rounded-full border-gray-200 px-6 py-3 shadow-sm"
                        type="email"
                        placeholder="Enter your email"
                      />

                      <button className="relative inline-flex items-center justify-center sm:w-full p-4 py-3 overflow-hidden font-medium text-indigo-500 transition duration-100 ease-out border-2 border-indigo-500/30 rounded-3xl shadow-lg group">
                        <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white text-xl duration-100 -translate-x-full bg-indigo-600 dark:bg-indigo-500 group-hover:translate-x-0 ease">
                          <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 448 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                          <path d="M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z">
                          </path>
                          </svg>
                        </span>
                        <span className="absolute flex items-center justify-center w-full h-full text-indigo-500 dark:text-indigo-400 transition-all duration-300 transform group-hover:translate-x-full ease">Subscribe</span>
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
              <motion.li whileHover={{
                x: 0,
                y: -5,
                scale: 1,
                rotate: 0,
              }}>
                <Link
                  href="/"
                  rel="noreferrer"
                  target="_blank"
                  className="text-indigo-700 transition hover:text-indigo-700/75"
                >
                  <span className="sr-only">Facebook</span>
                  <FaFacebookF className="h-6 w-6 dark:text-white" />
                </Link>
              </motion.li>

              <motion.li whileHover={{
                x: 0,
                y: -5,
                scale: 1,
                rotate: 0,
              }}>
                <Link
                  href="/"
                  rel="noreferrer"
                  target="_blank"
                  className="text-indigo-700 transition hover:text-indigo-700/75"
                >
                  <FaInstagram className="h-6 w-6 dark:text-white" />

                  <span className="sr-only">Instagram</span>
                </Link>
              </motion.li>

              <motion.li whileHover={{
                x: 0,
                y: -5,
                scale: 1,
                rotate: 0,
              }}>
                <Link
                  href="/"
                  rel="noreferrer"
                  target="_blank"
                  className="text-indigo-700 transition hover:text-indigo-700/75"
                >
                  <span className="sr-only">Twitter</span>
                  <FaTwitter className="h-6 w-6 dark:text-white" />
                </Link>
              </motion.li>

              <motion.li whileHover={{
                x: 0,
                y: -5,
                scale: 1,
                rotate: 0,
              }}>
                <Link
                  href="/"
                  rel="noreferrer"
                  target="_blank"
                  className="text-indigo-700 transition hover:text-indigo-700/75"
                >
                  <span className="sr-only">GitHub</span>
                  <FaGithub className="h-6 w-6 dark:text-white" />
                </Link>
              </motion.li>

              <motion.li whileHover={{
                x: 0,
                y: -5,
                scale: 1,
                rotate: 0,
              }}>
                <Link
                  href="/"
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

export default Footer;
