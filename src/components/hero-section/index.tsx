import Image from "next/image";
import { Play, Star, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden w-full">
      <div className="absolute inset-0 z-0 w-full" >
        <Image
          src={"/images/cinema.jpg"}
          alt="Cinema atmosphere"
          className="w-full h-full object-fill"
          fill
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent"> </div>
      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          <Badge className="mb-6 bg-primary/20 text-primary border-primary/30">
            <TrendingUp className="w-4 h-4 mr-2" />
            Plataforma #1 de Reviews de Cinema
          </Badge>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-accent bg-clip-text text-transparent">
            CineReview
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Descubra, avalie e compartilhe suas opiniões sobre os melhores
            filmes e séries. Conecte-se com outros cinéfilos e encontre sua
            próxima obsessão cinematográfica.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-glow">
            <Link href="/movies">
              <Play className="w-5 h-5 mr-2" />
              Explorar Filmes
            </Link>
          </Button>
        </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center animate-slide-up">
              <div className="text-3xl font-bold text-primary mb-2">50K+</div>
              <div className="text-muted-foreground">Filmes Catalogados</div>
            </div>
            <div
              className="text-center animate-slide-up"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="text-3xl font-bold text-primary mb-2">1M+</div>
              <div className="text-muted-foreground">Reviews Publicados</div>
            </div>
            <div
              className="text-center animate-slide-up"
              style={{ animationDelay: "0.4s" }}
            >
              <div className="text-3xl font-bold text-primary mb-2">100K+</div>
              <div className="text-muted-foreground">Usuários Ativos</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
