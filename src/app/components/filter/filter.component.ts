import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Article } from 'src/app/features/interfaces/article.interfaces';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
})
export class FilterComponent {
  filterForm!: FormGroup;

  @Output() filterParams = new EventEmitter<any>();
  @Input() noticias?: Article[] = [];

  constructor() {
    this.filterForm = new FormGroup({
      searchQuery: new FormControl(''),
      selectedDate: new FormControl(''),
    });

    this.filterForm.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe(() => {
        this.filter();
      });
  }

  filter() {
    const params = this.filterForm.value;
    if (this.noticias) {
      const noticiasFiltradas = this.filtroNoticias(this.noticias, params);
      this.filterParams.emit(noticiasFiltradas);
    }
  }

  filtroNoticias(noticias: Article[], filtro: any): any[] {
    return noticias.filter((noticia) => {
      const isFechaIgual = filtro.selectedDate
        ? this.isIgualFecha(noticia.published_at, filtro.selectedDate)
        : true;
      const isBusquedaIgual =
        !filtro.searchQuery ||
        noticia.title
          .toLowerCase()
          .includes(filtro.searchQuery.toLowerCase()) ||
        noticia.summary
          .toLowerCase()
          .includes(filtro.searchQuery.toLowerCase());
      return isFechaIgual && isBusquedaIgual;
    });
  }
  isIgualFecha(fecha1: string, fecha2: string): boolean {
    const date1 = fecha1.slice(0, 10);
    const date2 = fecha2.slice(0, 10);

    const fecha1Date = new Date(date1);
    const fecha2Date = new Date(date2);

    return (
      fecha1Date.getFullYear() === fecha2Date.getFullYear() &&
      fecha1Date.getMonth() === fecha2Date.getMonth() &&
      fecha1Date.getDate() === fecha2Date.getDate()
    );
  }

  limpiarFiltro() {
    this.filterForm.reset();
    this.filterParams.emit([]);
  }
}
