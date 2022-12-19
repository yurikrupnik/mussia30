package go_service_pb

import (
	"testing"
)

func TestServicePb(t *testing.T) {
	result := ServicePb("works")
	if result != "ServicePb works" {
		t.Error("Expected ServicePb to append 'works'")
	}
}
