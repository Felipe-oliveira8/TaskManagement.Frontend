import { Directive, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import Cleave from 'cleave.js';

@Directive({
   selector: '[appMask]',
})
export class MaskDirective implements OnInit, OnDestroy {
   constructor(private hostElRef: ElementRef<HTMLInputElement>) {}
   private cleave: Cleave;
   @Input('appMask') public appMask: 'phone' | 'cpf';

   ngOnInit() {
      this.buildCleave();
   }

   private buildCleave(): void {
      const cleaveOptions = this.getCleaveOptions();
      const hostEl = this.hostElRef.nativeElement;

      this.cleave = new Cleave(hostEl, {
         ...cleaveOptions,
      });
   }

   private getCleaveOptions(): object {
      switch (this.appMask) {
         case 'cpf':
            return {
               delimiters: ['.', '.', '-'],
               blocks: [3, 3, 3, 2],
               numericOnly: true,
            };
         case 'phone':
            return {
               delimiters: ['(', ')', ' ', '-'],
               blocks: [0, 2, 0, 5, 4],
               numericOnly: true,
            };
      }
   }

   ngOnDestroy(): void {
      this.destroyCleaveJs();
   }

   private destroyCleaveJs(): void {
      if (this.cleave) {
         this.cleave.destroy();
      }
   }
}
