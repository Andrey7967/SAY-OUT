.PHONY: dev

dev:
	@echo "Starting frontend and backend..."
	@# Фронтенд в фоне
	cd frontend && npm run dev &
	@# Бэкенд в фоне  
	cd backend && npx ts-node src/server.ts &
	@# Ждём завершения (Ctrl+C чтобы остановить)
	wait