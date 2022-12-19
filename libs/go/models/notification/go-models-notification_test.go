package go_models_notification

import (
	"testing"
)

func TestNotification(t *testing.T) {
	result := Notification("works")
	if result != "Notification works" {
		t.Error("Expected Notification to append 'works'")
	}
}
