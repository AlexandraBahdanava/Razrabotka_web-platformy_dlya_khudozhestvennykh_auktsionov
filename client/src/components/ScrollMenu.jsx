import React, { useState, useEffect } from "react";
import "./../App.css"; // Подключение стилей (можете настроить стили в соответствии с вашими требованиями)

const ScrollMenu = () => {
    const [activeSection, setActiveSection] = useState(null);
  
    useEffect(() => {
      // Обработчик события прокрутки страницы
      const handleScroll = () => {
        // Находим все секции на странице
        const sections = document.querySelectorAll(".scroll-section");
  
        // Определяем текущую видимую секцию
        let currentSection = null;
        sections.forEach((section) => {
          const rect = section.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            currentSection = section.id;
          }
        });
  
        // Устанавливаем активную секцию
        setActiveSection(currentSection);
      };
  
      // Добавляем слушатель события прокрутки
      window.addEventListener("scroll", handleScroll);
  
      // Убираем слушатель события прокрутки при размонтировании компонента
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, []);
  
    // Обработчик нажатия на кнопку
    const handleButtonClick = (sectionId) => {
      const section = document.getElementById(sectionId);
      if (section) {
        // Прокручиваем страницу до выбранной секции
        window.scrollTo({ top: section.offsetTop, behavior: "smooth" });
      }
    };
  
    return (
      <div className="scroll-menu">
        <button
          className={activeSection === "about" ? "active" : ""}
          onClick={() => handleButtonClick("about")}
        >
          Об авторе
        </button>
        <button
          className={activeSection === "portfolio" ? "active" : ""}
          onClick={() => handleButtonClick("portfolio")}
        >
          Портфолио
        </button>
        <button
          className={activeSection === "auctions" ? "active" : ""}
          onClick={() => handleButtonClick("auctions")}
        >
          Аукционы
        </button>
        <button
          className={activeSection === "reviews" ? "active" : ""}
          onClick={() => handleButtonClick("reviews")}
        >
          Отзывы
        </button>
      </div>
    );
  };
  
  export default ScrollMenu;