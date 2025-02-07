import  { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "./App.css";

const Header = () => (
    <header className="header">
        <h1>Университет ИТУ</h1>
        <nav>
            <ul>
                <li><Link to="/">О программе</Link></li>
                <li><Link to="/course">Информация о курсе</Link></li>
                <li><Link to="/enrollment">Регистрация</Link></li>
                <li><Link to="/faculty">Преподаватели</Link></li>
            </ul>
        </nav>
    </header>
);

const About = () => (
    <section className="section about">
        <h2>О программе</h2>
        <p>Университет IITU ориентирован на технологии, инновации и академическое превосходство.</p>
    </section>
);

// eslint-disable-next-line react/prop-types
const CourseInfo = ({ courseName }) => (
    <section className="section course-info">
        <h2>Информация о курсе</h2>
        <p>Название курса: {courseName}</p>
        <p>Описание курса: Изучение основ веб-разработки на React.js.</p>
    </section>
);

const Enrollment = () => {
    const [students, setStudents] = useState(0);

    return (
        <section className="section enrollment">
            <h2>Регистрация на курс</h2>
            <p>Зарегистрированные студенты: {students}</p>
            <button className="btn" onClick={() => setStudents(students + 1)}>+</button>
            <button className="btn" onClick={() => setStudents(students - 1)} disabled={students === 0}>-</button>
        </section>
    );
};

const Faculty = () => (
    <section className="section faculty">
        <h2>Преподаватели</h2>
        <p>Иван Иванов - профессор программирования.</p>
    </section>
);

const Footer = () => (
    <footer className="footer">
        <p>Контакты: iitu@edu.kz | <a href="#">Facebook</a> | <a href="#">Twitter</a> | <a href="#">LinkedIn</a></p>
    </footer>
);

const App = () => (
    <Router>
        <Header />
        <main>
            <Routes>
                <Route path="/" element={<About />} />
                <Route path="/course" element={<CourseInfo courseName="Разработка интерфейса" />} />
                <Route path="/enrollment" element={<Enrollment />} />
                <Route path="/faculty" element={<Faculty />} />
            </Routes>
        </main>
        <Footer />
    </Router>
);

export default App;
