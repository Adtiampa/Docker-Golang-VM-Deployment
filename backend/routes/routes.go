package routes

import (
	"backend/handlers"
	"backend/middleware"

	"github.com/gofiber/fiber/v2"
)

func SetupRoutes(app *fiber.App) {
	// Health check route
	app.Get("/health", handlers.HealthCheck)

	// Your existing routes
	api := app.Group("/api")
	api.Post("/signup", handlers.SignUp)
	api.Post("/login", handlers.Login)

	protected := api.Group("/", middleware.Protected())
	protected.Get("/profile", handlers.GetProfile)
}
