import { Component, Input, OnInit } from '@angular/core';
import { ServicesService } from '../services/services.service';
import { Subscription } from 'rxjs';
import { Article } from '../interfaces/article.interfaces';

@Component({
  selector: 'app-principalpage',
  templateUrl: './principalpage.component.html',
  styleUrls: ['./principalpage.component.css'],
})
export class PrincipalpageComponent implements OnInit {
  @Input() public noticias!: Article[];
  public noticiasFiltradas!: Article[];
  public subs: Subscription[] = [];
  private dataSubscription!: Subscription;
  public isExistNews: boolean = false;
  public isLoading: boolean = false;
  public noMatches: boolean = false;

  public pageSize: number = 6; 
  public currentPage: number = 1; 
  constructor(private readonly service: ServicesService) {}

  ngOnInit(): void {
    this.getNoticias();
  }

  getNoticias(): void {
    this.isLoading = true;
    this.subs.push(
      this.service.getArticles().subscribe(
        (articles: any) => {
          this.noticias = articles.results;
          this.noticiasFiltradas = this.noticias;
          this.isExistNews = true;
          this.isLoading = false;
        },
        (error) => {
          console.error('Error al obtener los artículos:', error);
          this.isLoading = false;
        }
      )
    );
  }

  recibirNoticiasFiltradas(event: any) {
    if (event.length === 0) {
      this.noMatches = true;
      this.noticiasFiltradas = this.noticias;
    } else {
      this.noMatches = false;
      this.noticiasFiltradas = event;
    }
  }

  ngOnDestroy(): void {
    this.subs.forEach((sub) => sub.unsubscribe());
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }
  }
}
