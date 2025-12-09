'use client'

// app/register/page.jsx
import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styles from './Register.module.css';

const Register = () => {
    const [submitted, setSubmitted] = useState(false);

    const validationSchema = Yup.object({
        name: Yup.string()
            .min(2, 'Name muss mindestens 2 Zeichen lang sein')
            .required('Name ist erforderlich'),
        email: Yup.string()
            .email('Geben Sie eine gültige E-Mail-Adresse ein')
            .required('E-Mail ist erforderlich'),
        password: Yup.string()
            .min(8, 'Passwort muss mindestens 8 Zeichen lang sein')
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Passwort muss einen Großbuchstaben und eine Ziffer enthalten')
            .required('Passwort ist erforderlich'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password')], 'Die Passwörter stimmen nicht überein')
            .required('Bestätigung ist erforderlich')
    });

    const handleSubmit = (values, { setSubmitting }) => {
        console.log('Registrierungsformular:', values);
        // Тут пізніше fetch до ендпоінту
        setSubmitting(false);
        setSubmitted(true);
    };

    return (
        <div className={styles.registerPage}>
            <div className={styles.container}>
                <div className={styles.registerFormWrapper}>
                    <h2 className={styles.registerTitle}>Registrierung</h2>
                    <p className={styles.registerSubtitle}>Erstellen Sie ein Konto, um Einkäufe zu beginnen</p>

                    <Formik
                        initialValues={{
                            name: '',
                            email: '',
                            password: '',
                            confirmPassword: ''
                        }}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ isSubmitting, errors, touched }) => (
                            <Form className={styles.registerForm}>
                                <div className={styles.formGroup}>
                                    <label htmlFor="name">Name</label>
                                    <Field
                                        type="text"
                                        id="name"
                                        name="name"
                                        placeholder="Geben Sie Ihren Namen ein"
                                        className={`${styles.inputField} ${touched.name && errors.name ? styles.errorField : ''}`}
                                    />
                                    <ErrorMessage name="name" component="div" className={styles.errorMessage} />
                                </div>

                                <div className={styles.formGroup}>
                                    <label htmlFor="email">E-Mail</label>
                                    <Field
                                        type="email"
                                        id="email"
                                        name="email"
                                        placeholder="example@email.com"
                                        className={`${styles.inputField} ${touched.email && errors.email ? styles.errorField : ''}`}
                                    />
                                    <ErrorMessage name="email" component="div" className={styles.errorMessage} />
                                </div>

                                <div className={styles.formGroup}>
                                    <label htmlFor="password">Passwort</label>
                                    <Field
                                        type="password"
                                        id="password"
                                        name="password"
                                        placeholder="Geben Sie Ihr Passwort ein"
                                        className={`${styles.inputField} ${touched.password && errors.password ? styles.errorField : ''}`}
                                    />
                                    <ErrorMessage name="password" component="div" className={styles.errorMessage} />
                                </div>

                                <div className={styles.formGroup}>
                                    <label htmlFor="confirmPassword">Passwort bestätigen</label>
                                    <Field
                                        type="password"
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        placeholder="Wiederholen Sie das Passwort"
                                        className={`${styles.inputField} ${touched.confirmPassword && errors.confirmPassword ? styles.errorField : ''}`}
                                    />
                                    <ErrorMessage name="confirmPassword" component="div" className={styles.errorMessage} />
                                </div>

                                <button type="submit" disabled={isSubmitting} className={styles.registerBtn}>
                                    {isSubmitting ? 'Registrieren...' : 'Registrieren'}
                                </button>
                            </Form>
                        )}
                    </Formik>

                    <p className={styles.registerLink}>
                        Haben Sie bereits ein Konto? <a href="login">Melden Sie sich an</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;