'user client'

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styles from './LoginModal.module.css';

const LoginModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    const validationSchema = Yup.object({
        email: Yup.string()
            .email('Geben Sie eine gültige E-Mail-Adresse ein')
            .required('E-Mail ist erforderlich'),
        password: Yup.string()
            .min(6, 'Passwort muss mindestens 6 Zeichen lang sein')
            .required('Passwort ist erforderlich')
    });

    const handleSubmit = (values, { setSubmitting }) => {
        console.log('Anmeldung:', values);
        // Тут пізніше fetch до ендпоінту
        setSubmitting(false);
        // Можеш додати onSuccess колбек, щоб закрити модалку
        onClose();
    };

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <button className={styles.closeBtn} onClick={onClose}>×</button>

                <h2 className={styles.title}>Anmeldung</h2>
                <p className={styles.subtitle}>Melden Sie sich an, um weiter einzukaufen</p>

                <Formik
                    initialValues={{
                        email: '',
                        password: ''
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting, errors, touched }) => (
                        <Form className={styles.form}>
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

                            <button type="submit" disabled={isSubmitting} className={styles.loginBtn}>
                                {isSubmitting ? 'Anmelden...' : 'Anmelden'}
                            </button>
                        </Form>
                    )}
                </Formik>

                <p className={styles.link}>
                    Kein Konto? <a href="/register" onClick={onClose}>Registrieren</a>
                </p>
            </div>
        </div>
    );
};

export default LoginModal;