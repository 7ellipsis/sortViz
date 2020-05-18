import { Component, OnInit } from '@angular/core';
import { mergeSort } from './../../src/sort.js';
import { bubbleSort } from './../../src/sort.js';
import { selectionSort } from './../../src/sort.js';
import { quickSort } from './../../src/sort.js';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  speed = 100;
  initial_bars = 100;
  max = 320;
  sortedColor = 'lightseagreen';
  compareColor = 'red';
  swapColor='orange';
  arr: number[] = [];
  a: number[] = [];
  min = 5;
  random(min: number, max: number) {
    return Math.floor(Math.random() * (300) + min);
  }
  reset(min, max) {
    this.arr = [];
    this.a = [];
    for (let i = min; i < max + min; i++)
      this.arr.push(this.random(min, max));
    let bars = document.getElementsByClassName('items') as HTMLCollectionOf<HTMLElement>;
    for (let i = 0; i < bars.length; i++)
      bars[i].style.backgroundColor = "purple"
    this.a = this.arr.slice();
  }
  slide() {
    var slider = document.getElementById("myRange") as HTMLInputElement;
    var output = document.getElementById("demo") as HTMLElement;
    var x =
      output.innerHTML = slider.value;
    this.reset(this.min, +slider.value);
  }

 

  constructor() {
  }


  //////////////////////////////////////merge sort
  mergesort() {
    let hr=document.querySelector('#hr') as HTMLElement;
    hr.style.visibility='visible';
    let oldbar;
    const animations = mergeSort(this.arr);
    for (let i = 0; i < animations.length; i++) {
      const bars = document.getElementsByClassName('items') as HTMLCollectionOf<HTMLElement>;
      if(oldbar!=undefined)
      bars[oldbar].style.backgroundColor=this.sortedColor;
      const colorChange = i % 3 !== 2;
      if (colorChange) {
        const [bar, bar_] = animations[i];
        const barStyle = bars[bar].style;
        const bar_Style = bars[bar_].style;
        const color = i % 3 === 0 ? this.compareColor : this.sortedColor;
        setTimeout(() => {
          if(oldbar!=undefined)
          bars[oldbar].style.backgroundColor=this.sortedColor;
          barStyle.backgroundColor = color;
          bar_Style.backgroundColor = color;
        }, i * this.speed);
      } else {
        setTimeout(() => {
          const [bar, newHeight] = animations[i];
          const barStyle = bars[bar].style;
          barStyle.backgroundColor=this.swapColor;
          barStyle.height = `${newHeight}px`;
          oldbar=bar;
          if(i==animations.length-1)
          {
          bars[oldbar].style.backgroundColor=this.sortedColor;
          hr.style.visibility='hidden';  
        }
        }, i * this.speed);
      }
    }

  }
  merge() {
    this.mergesort();
  }
  ///////////////////////////////////////////////sortAnimation
  sortAnimation(animations) {
    let hr=document.querySelector('#hr') as HTMLElement;
    hr.style.visibility='visible';
    let x,y;
    for (let i = 0; i < animations.length; i++) {
      const bars = document.getElementsByClassName('items') as HTMLCollectionOf<HTMLElement>;
      const [bar, newHeight, bar_, newHeight_, bool] = animations[i];
      const barStyle = bars[bar].style;
      const barStyle_ = bars[bar_].style;
      if (bool == true) {
        setTimeout(() => {
          if (x != undefined && y != undefined) {
            bars[x].style.backgroundColor = this.sortedColor;
            bars[y].style.backgroundColor = this.sortedColor;
          }
          barStyle.backgroundColor = this.compareColor;
          barStyle_.backgroundColor = this.compareColor;
          bars[bar].style.backgroundColor=this.swapColor;
          bars[bar_].style.backgroundColor=this.swapColor;
          let temp = bars[bar].style.height;
          bars[bar].style.height = bars[bar_].style.height;
          bars[bar_].style.height = temp;
          x = bar;
          y = bar_;
          if (i == animations.length - 1) {
            bars[animations[i][2]].style.backgroundColor = this.sortedColor
            bars[animations[i][0]].style.backgroundColor = this.sortedColor
            hr.style.visibility='hidden';
          }
        }, i * this.speed);
      }
      else {
        setTimeout(() => {
          if (x != undefined && y != undefined) {
            bars[x].style.backgroundColor = this.sortedColor;
            bars[y].style.backgroundColor = this.sortedColor;
          }
          barStyle.backgroundColor = this.compareColor;
          barStyle_.backgroundColor = this.compareColor;
          x = bar;
          y = bar_;
          if (i == animations.length - 1) {
            bars[animations[i][2]].style.backgroundColor = this.sortedColor
            bars[animations[i][0]].style.backgroundColor = this.sortedColor
            hr.style.visibility='hidden';
          }
        }, i * this.speed);
      }
    }
  }
  ///////////////////////////////////////////////
  ///////////////////////////////////////////////bubblesort
  
  bubble() {
    this.bubblesort();
  }
  bubblesort() {
    const animations = bubbleSort(this.arr);
    this.sortAnimation(animations);
  }
  ///////////////////////////////////////////////selectionsort
  selection() {
    this.selectionsort();
  }
  selectionsort() {
    const animations = selectionSort(this.arr);
    this.sortAnimation(animations);
  }
  ///////////////////////////////////////////////quicksort
  quick() {
    this.quicksort();
  }
  quicksort() {
    const animations = quickSort(this.arr);
    this.sortAnimation(animations);
  }
  ///////////////////////////////////////////////
  ngOnInit(): void {
    this.reset(this.min, this.initial_bars);
  }
}
