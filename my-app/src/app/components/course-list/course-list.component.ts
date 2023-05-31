import { Component, OnInit } from '@angular/core';
import { ICourse } from 'src/app/models/course';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss'],
})
export class CourseListComponent implements OnInit {
  courses: ICourse[] = [];

  ngOnInit(): void {
    this.courses = [
      {
        id: 1,
        title: 'Мидл python-разработчик',
        creationDate: new Date(),
        duration: 200,
        description:
          'Курс рассчитан на разработчиков, знакомых с Python и желающих повысить профессиональный уровень Вводной части для знакомства с языком нет, начинаются занятия сразу с разработки программного обеспечения. Цель – обучиться решать сложные задачи backend-разработке на Python.',
      },
      {
        id: 2,
        title: 'Углублённое программирование на C/C++',
        creationDate: new Date(),
        duration: 400,
        description:
          'Курс разработан для отработки умений и навыков программирования на C++ среднего уровня сложности. Студенты смогут научиться эффективной работе с памятью, займутся практическим кодированием с применением стандартной библиотеки C++ и шаблонов, познакомятся с возможностями диалектов C++11/C++14.',
      },
      {
        id: 3,
        title: 'Веб разработка-быстрый старт',
        creationDate: new Date(),
        duration: 100,
        description:
          'Курс для желающих начать изучение веб-разработки. Во время учебы, студенты знакомятся с языком PHP, изучают принципы работы веб-приложений. К концу курса студент сможет создать простой сайт, поработать над усовершенствованием его функциональности, разместить созданный сайт в интернете. Полученные навыки станут надежной базой для дальнейшего роста в профессии.',
      },
      {
        id: 4,
        title: 'PHP базовый курс',
        creationDate: new Date(),
        duration: 50,
        description:
          'Базовый курс для изучения языка программирования на PHP с «нуля». В нём подробно разбираются основы, без которых невозможно двигаться дальше. К концу обучения студенты смогут создавать простые сайты.',
      },
      {
        id: 5,
        title: 'Intro to iOS App Development with Swift',
        creationDate: new Date(),
        duration: 150,
        description:
          'Курс для разработчиков, желающих научиться создавать приложения для iPhone. Цель – познакомить учеников с языком программирования Swift. Для успешной учебы необходимо иметь опыт программирования, знать, что такое переменные, циклы, классы, функции. Кроме того, для учебы требуется компьютер Mac с OS X 10.10 (как минимум, более поздние версии подойдут).',
      },
    ];
  }

  editCourse(course: ICourse) {
    console.log(course);
  }

  deleteCourse(id: number) {
    console.log(id);
  }

  loadMore() {
    console.log('load more');
  }
}
