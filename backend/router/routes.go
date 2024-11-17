package routes

import (
	"backend/handlers"
	"backend/middleware"

	"github.com/gofiber/fiber/v2"
)

func SetupRoutes(app *fiber.App) {
	// Public routes
	api := app.Group("/api")
	api.Post("/signup", handlers.SignUp)
	api.Post("/login", handlers.Login)

	// Protected routes
	protected := api.Group("/", middleware.Protected())
	protected.Get("/profile", handlers.GetProfile)
}
