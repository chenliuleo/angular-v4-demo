import { Injectable } from '@angular/core';
import { Plan } from '../bean/plan';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
@Injectable()
export class PlanService {
  plans: Plan[];
  totalTime = 0;
  totalTime$ = new BehaviorSubject<number>(this.totalTime);
  constructor() {
    this.plans = [];
    this.totalTime = this.getTotalTime2();
   }
  getPlans() {
   return this.plans;
  }
  // Add event
  addPlan(newplan: Plan) {
    this.plans.push(newplan);
    this.totalTime = this.getTotalTime2();
    this.updateTotalTimeSbj(this.totalTime);
  }
  // Delete event
  deletePlan(id: number) {
    let index = 0;
    for (let i = 0; i < this.plans.length; i++) {
      if (this.plans[i].id === id) {
        index = i;
        break;
      }
    }
    this.plans.splice(index, 1);
    this.totalTime = this.getTotalTime2();
    this.updateTotalTimeSbj(this.totalTime);
  }
  // get a event
  getPlan(id: number) {
    for (let i = 0; i < this.plans.length; i++) {
      if (this.plans[i].id === id) {
        return this.plans[i];
      }
    }
  }
  // Calculate total time
  getTotalTime2() {
    let t = 0;
    for (const p of this.plans) {
      t += p.totalTime;
    }
    return t;
  }
  get getTotalTime(): number {
    return this.totalTime;
  }
  private updateTotalTimeSbj(value) {
    this.totalTime$.next(value);
  }
}
