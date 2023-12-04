import emailjs from '@emailjs/browser';
import { Canvas } from '@react-three/fiber';
import React, { Suspense, useRef, useState } from 'react'
import Loader from '../components/Loader';
import Fox from '../models/Fox';
import useAlert from "../hooks/useAlert";
import Alert from '../components/Alert';

const Contact = () => {
    const formRef = useRef();
    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [loading, setLoading] = useState(false);
    const [currentAnimation, setCurrentAnimation] = useState('idle');
    const { alert, showAlert, hideAlert } = useAlert();


    const handleChange = ({ target: { name, value } }) => {
        setForm({ ...form, [name]: value });
    };
    const handleFocus = () => setCurrentAnimation("walk");
    const handleBlur = () => setCurrentAnimation("idle");


    const handleSubmit = () => {
        e.preventDefault();
        setLoading(true);
        setCurrentAnimation('hit')

        emailjs.send(
            import.meta.env.EMAILJS_SERVICE_ID,
            import.meta.env.EMAILJS_TEMPLATE_ID,
            {
                from_name: form.name,
                to_name: "Piyush",
                from_email: form.email,
                to_email: "piyushsiingh03@gmail.com",
                message: form.message,

            },
            import.meta.env.EMAILJS.PUBLIC_KEY

        ).then(() => {
            setLoading(false);
            showAlert({ show: true, text: 'Message Sent Successfully', type: 'success' })


            setTimeout(() => {
                hideAlert();
                setCurrentAnimation('idle');
                setForm({ name: '', email: '', message: '' });
            }, [3000])


        }).catch((err) => {
            console.error(err);
            showAlert({ show: true, text: "I didn't get your message", type: 'danger' })
            setCurrentAnimation('idle');
            setLoading(false);
        })
    }
    return (
        <section className='relative flex lg:flex-row flex-col max-container'>
            {alert.show && <Alert {...alert} />}

            <div className='flex-1 min-w-[50%] flex flex-col'>
                <h1 className='head-text'>Get in Touch</h1>

                <form
                    ref={formRef}
                    className='w-full flex flex-col gap-7 mt-14'
                    onSubmit={handleSubmit}>
                    <label className='text-black-500 font-semibold'>Name
                        <input
                            type='text'
                            name='name'
                            className='input'
                            placeholder='Luke'
                            required
                            value={form.name}
                            onChange={handleChange}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                        />
                    </label>
                    <label className='text-black-500 font-semibold'> Email
                        <input
                            type='email'
                            name='email'
                            className='input'
                            placeholder='jack@sparrow.com'
                            required
                            value={form.email}
                            onChange={handleChange}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                        />
                    </label>
                    <label className='text-black-500 font-semibold'>Your Message
                        <textarea
                            rows={4}
                            name='message'
                            className='textarea'
                            placeholder='Let me know how can i help you!'
                            required
                            value={form.message}
                            onChange={handleChange}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                        />
                    </label>

                    <button
                        type='submit'
                        disabled={loading}
                        className='btn'
                        onFocus={handleFocus}
                        onBlur={handleBlur}

                    >
                        {loading ? 'Sending...' : 'Submit'}
                    </button>
                </form>
            </div>

            <div className='lg:w-1/2 w-full lg:h-auto md:h-[550px] h-[350px]'>
                <Canvas
                    camera={{
                        position: [0, 0, 5],
                        fov: 75,
                        near: 0.1,
                        far: 1000,
                    }}
                ><directionalLight intensity={2.5} position={[0, 0, 1]} />
                    <ambientLight intensity={0.5} />
                    <Suspense fallback={<Loader />}>
                        <Fox
                            currentAnimation={currentAnimation}
                            position={[0.5, 0.35, 0]}
                            rotation={[12.6, -0.6, 0]}
                            scale={[0.5, 0.5, 0.5]}
                        >

                        </Fox>
                    </Suspense>

                </Canvas>
            </div>

        </section>
    )
}

export default Contact
