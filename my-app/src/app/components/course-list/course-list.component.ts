import { Component, OnInit } from '@angular/core';
import { ICourse } from 'src/app/models/course';
import { FilterPipe } from '../../pipes/filter.pipe';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss'],
})
export class CourseListComponent implements OnInit {
  courses: ICourse[] = [];
  filteredCourses: ICourse[] = [];

  constructor(private filterPipe: FilterPipe) {}

  ngOnInit(): void {
    this.courses = [
      {
        id: 1,
        name: 'Мидл python-разработчик',
        creationDate: new Date(new Date().setDate(new Date().getDate() - 7)),
        duration: 222,
        description:
          'Курс рассчитан на разработчиков, знакомых с Python и желающих повысить профессиональный уровень Вводной части для знакомства с языком нет, начинаются занятия сразу с разработки программного обеспечения. Цель – обучиться решать сложные задачи backend-разработке на Python.',
        topRated: true,
      },
      {
        id: 2,
        name: 'Углублённое программирование на C/C++',
        creationDate: new Date(new Date().setDate(new Date().getDate() - 21)),
        duration: 401,
        description:
          'Курс разработан для отработки умений и навыков программирования на C++ среднего уровня сложности. Студенты смогут научиться эффективной работе с памятью, займутся практическим кодированием с применением стандартной библиотеки C++ и шаблонов, познакомятся с возможностями диалектов C++11/C++14.',
      },
      {
        id: 3,
        name: 'Веб разработка-быстрый старт',
        creationDate: new Date(new Date().setDate(new Date().getDate() + 1)),
        duration: 100,
        description:
          'Курс для желающих начать изучение веб-разработки. Во время учебы, студенты знакомятся с языком PHP, изучают принципы работы веб-приложений. К концу курса студент сможет создать простой сайт, поработать над усовершенствованием его функциональности, разместить созданный сайт в интернете. Полученные навыки станут надежной базой для дальнейшего роста в профессии.',
      },
      {
        id: 4,
        name: 'PHP базовый курс',
        creationDate: new Date(new Date().setDate(new Date().getDate() - 13)),
        duration: 56,
        description:
          'Базовый курс для изучения языка программирования на PHP с «нуля». В нём подробно разбираются основы, без которых невозможно двигаться дальше. К концу обучения студенты смогут создавать простые сайты.',
      },
      {
        id: 5,
        name: 'Intro to iOS App Development with Swift',
        creationDate: new Date(new Date().setDate(new Date().getDate() - 45)),
        duration: 150,
        description:
          'Курс для разработчиков, желающих научиться создавать приложения для iPhone. Цель – познакомить учеников с языком программирования Swift. Для успешной учебы необходимо иметь опыт программирования, знать, что такое переменные, циклы, классы, функции. Кроме того, для учебы требуется компьютер Mac с OS X 10.10 (как минимум, более поздние версии подойдут).',
      },
    ];

    this.filteredCourses = this.courses;
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

  searchCourse(searchString: string) {
    if (searchString === '') {
      this.filteredCourses = this.courses;
      return;
    }
    this.filteredCourses = this.filterPipe.transform(this.courses, 'name', searchString);
  }
}
