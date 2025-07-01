import { Component, OnInit } from '@angular/core';
import { NewsAPIService } from '../../services/news-api.service';
import { CommonModule } from '@angular/common';
import { IaApiService } from '../../services/ia-api.service';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-landing',
  imports: [CommonModule, MatInputModule, FormsModule],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent implements OnInit {
  
  chatOpen = false;
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
    private hfService: IaApiService
  ) {}

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

  sendMessage() {
    if (!this.userInput.trim()) return;

    const userMsg = this.userInput;
    this.messages.push({ from: 'user', text: userMsg });
    this.userInput = '';

    this.hfService.sendToAI(userMsg).subscribe({
      next: res => {
        const reply = res?.[0]?.generated_text || 'No entendí tu pregunta.';
        this.messages.push({ from: 'bot', text: reply });
      },
      error: () => {
        this.messages.push({ from: 'bot', text: 'Hubo un error al procesar tu mensaje.' });
      }
    });
  }


}
