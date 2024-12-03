import React from 'react'
import { useState } from 'react';
import Navigation from './Navbar'
import Sidebar from './Sidebar'

function Faqs() {
    const [selectedQuestion, setSelectedQuestion] = useState(null);

    const handleQuestionClick = (index) => {
        setSelectedQuestion(selectedQuestion === index ? null : index);
    };

    const faqs = [
        {
            question: 'What is the Escuela de Corazon Credential Submission Portal?',
            answer: 'The Escuela de Corazon Credential Submission Portal is an online platform where students and applicants can securely submit their academic credentials and other required documents for enrollment or administrative purposes.',
        },
        {
            question: 'What types of credentials can I submit through the portal?',
            answer: 'You can submit various credentials, including report cards, certificates of good moral character, birth certificates, and other documents required for enrollment or other school processes.',
        },
        {
            question: 'How do I submit my credentials through the portal?',
            answer: "To submit your credentials, log in to the Escuela de Corazon Portal and navigate to the 'Submit Credentials' section. Upload the required documents in the specified format, provide any necessary details, and click 'Submit' to complete the process.",
        },
        {
            question: 'Are my submitted documents secure?',
            answer: 'Yes, the Escuela de Corazon Portal uses secure encryption to ensure that all submitted documents and personal information are protected from unauthorized access.',
        },
        {
            question: 'Can I track the status of my credential submission?',
            answer: 'Yes, you can track the status of your submission through the portal. Log in and go to the "Submission History" section to see updates, including whether your documents have been reviewed or if additional information is required.',
        },
        {
            question: 'What should I do if I encounter issues while submitting my credentials?',
            answer: "If you encounter any issues, you can contact the school's technical support team through the 'Help Center' section of the portal. Provide details about the problem so they can assist you promptly.",
        }
    ];
    

    return (
        <div className='flex justify-center h-full pt-44 lg:pt-10'>
            <Navigation />
            <Sidebar />
            <div className='max-w-screen-md  2xl:max-w-screen-lg
            p-4 ml-3 mr-3 w-full md:w-max lg:w-full flex flex-col items-center'>
                <section className="py-10 sm:py-16 lg:py-24 w-full">
                    <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
                        <div className="max-w-2xl mx-auto text-center">
                            <h2 className="text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl
                             text-cyan-700">Frequently Asked Questions</h2>
                            <p className="max-w-xl mx-auto mt-4 text-base leading-relaxed text-gray-600">Find out everything you need to know in our FAQs.</p>
                        </div>

                        <div className="max-w-3xl mx-auto mt-8 space-y-4 md:mt-16">
                            {faqs.map((faq, index) => (
                                <div key={index} className="transition-all duration-200 bg-white border border-gray-200 shadow-lg cursor-pointer hover:bg-gray-50">
                                    <button type="button" className="flex items-center justify-between w-full px-4 py-5 sm:p-6" onClick={() => handleQuestionClick(index)}>
                                        <span className="flex text-lg font-semibold text-black">{faq.question}</span>
                                        <svg className={`w-6 h-6 text-gray-400 ${selectedQuestion === index ? 'rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>
                                    {selectedQuestion === index && (
                                        <div className="px-4 pb-5 sm:px-6 sm:pb-6">
                                            <p>{faq.answer}</p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        <p className="text-center text-gray-600 text-base mt-9">Didn’t find the answer you are looking for? <a href="https://www.facebook.com/jcdiff123/" title="" className="font-medium text-blue-600 transition-all duration-200 hover:text-blue-700 focus:text-blue-700 hover:underline">Contact our support</a></p>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default Faqs