package handlers

import (
	"os"
	"time"

	"backend/database"

	"github.com/gofiber/fiber/v2"
)

type HealthResponse struct {
	Status      string    `json:"status"`
	Timestamp   time.Time `json:"timestamp"`
	Environment string    `json:"environment"`
	Database    string    `json:"database"`
	Version     string    `json:"version"`
}

func HealthCheck(c *fiber.Ctx) error {
	// Check database connection
	dbStatus := "up"
	if db, err := database.DB.DB(); err != nil || db.Ping() != nil {
		dbStatus = "down"
	}

	health := HealthResponse{
		Status:      "ok",
		Timestamp:   time.Now(),
		Environment: os.Getenv("MODE"),
		Database:    dbStatus,
	}

	return c.Status(fiber.StatusOK).JSON(health)
}
