import { Component, OnInit } from '@angular/core';
import { NewsAPIService } from '../../services/news-api.service';
import { CommonModule } from '@angular/common';
import { IaApiService } from '../../services/ia-api.service';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-landing',
  imports: [CommonModule, MatInputModule, FormsModule],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent implements OnInit {
  
  chatOpen = false;
  isLoadingIA = false;
  userInput = '';
  messages: { from: 'user' | 'bot', text: string }[] = [];

  toggleChat() {
    this.chatOpen = !this.chatOpen;
  }

  articles: any[] = [];
  loadingnews = true;
  error = '';
  
  constructor(
    private newsService:NewsAPIService,
    private hfService: IaApiService,
    private router: Router,
  ) {}

  get logueado() {
    return !!sessionStorage.getItem('token');
  }

  ngOnInit(): void {
    this.newsService.getTechNewsInSpanish().subscribe({
      next: (data) => {
        this.articles = data.articles;
        this.loadingnews = false;
      },
      error: (err) => {
        this.error = 'Error al cargar las noticias.';
        this.loadingnews = false;
      }
    });
  }
  cerrarSesion() {
    sessionStorage.clear();
    this.router.navigate(['/']);
  }
  scrollTo(id: string, event: Event) {
    event.preventDefault(); // evita el salto arriba del todo
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  sendMessage() {
  if (!this.userInput.trim()) return;

    const userMsg = this.userInput;
    this.messages.push({ from: 'user', text: userMsg });
    this.userInput = '';
    this.isLoadingIA = true;

    this.hfService.sendToAI(userMsg).subscribe({
      next: res => {
      console.log('Respuesta IA:', res);
      const reply = res?.choices?.[0]?.message?.content || 'No entendí tu pregunta.';
      const formatted = reply.replace(/\n/g, '<br>').replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');
      this.messages.push({ from: 'bot', text: formatted });
      this.isLoadingIA = false;
    },
      error: () => {
        this.messages.push({ from: 'bot', text: 'Hubo un error al procesar tu mensaje.' });
        this.isLoadingIA = false;
      }
    });
  }


  scrollToTop(): void {
    const navbar = document.getElementById('navbar');
    navbar?.scrollIntoView({ behavior: 'smooth' });
  }

  registrarse() {
    this.router.navigate(['usuarios/nuevo']);
  }

  vercursos() {
    this.router.navigate(['curso']);
  }
  login() {
    this.router.navigate(['login']);
  }


}
