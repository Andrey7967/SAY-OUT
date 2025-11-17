dev:
	@echo "🚀 Starting frontend and backend..."
	cd frontend && npm run dev & \
	cd backend && ts-node src/server & \
	wait

.PHONY: dev